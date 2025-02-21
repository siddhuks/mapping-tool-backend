const { getMirthToken, createMirthChannel, deployMirthChannel, sendJsonToChannel } = require('./mirthService');
let channelConfig = require('./channelConfig');

const { allocatePort } = require('./portAllocator');


// (async() => {
// try {
//     if (!process.env.ALLOCATED_PORT) {
//         const port = await allocatePort(); // Use updated function
//         process.env.ALLOCATED_PORT = port;
//         console.log("Allocated Port:", port);
//     }
// } catch (error) {
//     console.error("Port allocation failed:", error.message);
// }
// })();

// const port = '8086';

let latestMessages = '';
let port_allocated = '';

const generateHL7Template = (updatedMappings) => {
    let template = "MSH|^~\\&||||||||||2.4\n";

    const repeatingSegments = ["OBR", "OBX", "NTE", "AL1", "CTD", "DG1", "FT1", "CTI", "SFT", "ARV", "ROL", "NK1", "DB1", "AUT", "RF1", "TQ1"]

    const segmentMaxIndex = {}; // Track highest instance number for each segment
    const allSegments = new Set(); // Track all unique segments

    // Identify segments and their highest index
    Object.entries(updatedMappings).forEach(([key, value]) => {
        const match = key.match(/^tmp\['(\w+)'\](?:\[(\d+)\])?/);
        if (match) {
            const segment = match[1];
            const instance = match[2] ? parseInt(match[2], 10) : 0;

            segmentMaxIndex[segment] = Math.max(segmentMaxIndex[segment] || 0, instance);
            allSegments.add(segment);
        }
    });

    console.log('All Segments:', allSegments);
    console.log('Segment Max Index:', segmentMaxIndex);

    // Remove MSH from non-repeating segments since it's already in the template
    const nonRepeatingSegments = [...allSegments].filter(seg => seg !== "MSH" && !repeatingSegments.includes(seg));
    const repeatingSegmentKeys = [...allSegments].filter(seg => repeatingSegments.includes(seg));

    // Generate non-repeating segments first
    nonRepeatingSegments.forEach((segment) => {
        template += `${segment}|${Array(4).fill('').join('|')}\n`; // Adds an empty HL7 segment line
    });

    console.log('Non-Repeating Segment Template:', template);

    // Generate repeating segments correctly
    repeatingSegmentKeys.forEach((segment) => {
        const maxIndex = segmentMaxIndex[segment] || 0; // Get highest instance index
        for (let i = 0; i <= maxIndex; i++) {
            template += `${segment}|${Array(4).fill('').join('|')}\n`; // Add correct number of instances
        }
    });

    console.log('Final Template:', template);

    return Buffer.from(template).toString('base64'); // Encode to Base64 for Mirth
};



// const generateHL7Template = (mappings) => {
//     let template =
//         "MSH|^~\\&|SendingApp|SendingFacility|ReceivingApp|ReceivingFacility|20250101010101|||12345|P|2.4\n";


//     const segmentMaxIndex = {};


//     Object.entries(mappings).forEach(([key]) => {

//         const match = key.match(/^tmp\['(\w+)'\]\[(\d+)\]/);
//         if (match) {
//             const [, segment, index] = match;
//             const instance = parseInt(index, 10);

//             segmentMaxIndex[segment] = Math.max(segmentMaxIndex[segment] || 0, instance);
//         }
//     });


//     const defaultSegments = ['PID', 'PV1'];


//     defaultSegments.forEach((segment) => {
//         if (!(segment in segmentMaxIndex)) {
//             segmentMaxIndex[segment] = 0;
//         }
//     });


//     Object.keys(segmentMaxIndex).forEach((segment) => {

//         if (segment === 'MSH') return;
//         for (let i = 0; i <= segmentMaxIndex[segment]; i++) {

//             template += `${segment}|${Array(50).fill('').join('|')}\n`;
//         }
//     });

//     return Buffer.from(template).toString('base64');
// };




const createChannel = async(req, res) => {

    try {
        // console.log("req.body: ", req.body)

        const { user, selectedType, mappings, toggleValidation, fieldValidations } = req.body;

        console.log("mappings: ", mappings)

        console.log("toggleValidation: ", toggleValidation)

        console.log("fieldValidations: ", fieldValidations)


        if (!user || !selectedType) {
            return res.status(400).json({ error: 'User and Message Type are required' });
        }

        if (!Array.isArray(mappings)) {
            throw new Error("Mappings is not an array!");
        }

        const repeatingSegments = ["OBR", "OBX", "NTE"]; // Define repeating segments

        mappings.sort((a, b) => {
            const extractSegmentName = (key) => {
                const match = key.match(/tmp\['(\w+)'\]/); // Extract the segment name
                return match ? match[1] : null;
            };

            const aSegment = extractSegmentName(a.key);
            const bSegment = extractSegmentName(b.key);

            const aIsRepeating = repeatingSegments.includes(aSegment);
            const bIsRepeating = repeatingSegments.includes(bSegment);

            if (aIsRepeating && !bIsRepeating) {
                return 1; // Move repeating segment after non-repeating
            } else if (!aIsRepeating && bIsRepeating) {
                return -1; // Move non-repeating before repeating
            } else {
                return a.key.localeCompare(b.key, undefined, { numeric: true }); // Default sorting
            }
        });

        console.log("mappings after sort: ", mappings)


        // Convert array back to object while preserving order
        const orderedMappings = {};
        mappings.forEach(({ key, value }) => {
            orderedMappings[key] = value;
        });



        const updatedMappings = Object.entries(orderedMappings).reduce((acc, [key, value]) => {
            // Check if fieldValidations[key] exists and is an array
            const fieldKey = value.startsWith("msg") ? value.replace(/^msg/, "") : value;

            // Check if fieldValidations[fieldKey] has trim: true
            const shouldTrim = Array.isArray(fieldValidations[fieldKey]) &&
                fieldValidations[fieldKey].some(rule => rule.trim === true);


            console.log("Array.isArray(fieldValidations[fieldKey]) :", Array.isArray(fieldValidations[fieldKey]), " ", fieldKey);
            console.log("shouldTrim for key:", fieldValidations[fieldKey], "=>", shouldTrim);

            if (shouldTrim) {
                if (typeof value === 'string' && !value.startsWith('msg')) {
                    value = value.trim(); // Directly trim the value
                    console.log('value trim: 1', value);
                } else if (typeof value === 'string' && value.startsWith('msg')) {
                    value = `${value}.trim()`; // Append .trim() to msg values
                    console.log('value trim: 2', value);
                }
            }

            acc[key] = value === 'serverTime' ? `DateUtil.getCurrentDate('yyyyMMddHHmmss')` : value;
            return acc;
        }, {});


        console.log("Updated Mappings: ", updatedMappings);

        const channelId = `${user.username}-${selectedType}`;
        const channelName = `${user.username}_${selectedType}`;
        const contextPath = `/user/${user.username}/${selectedType}`;

        const port = await allocatePort();
        port_allocated = port
            // process.env.ALLOCATED_PORT = port;
        if (!port) {
            console.error("All ports are in use. Cannot create channel.");
            return res.status(400).json({ error: "All ports are currently in use. Please try again later." });
        }

        console.log(`Allocated Port: ${port}`);

        const hostUrl = `https://${process.env.HOST}/api/mirth/receive`;
        const ip = '0.0.0.0'; // This should only be used for the sourceConnector

        // Replace ONLY the <host> inside <destinationConnectors>
        channelConfig = channelConfig.replace(
            /(<destinationConnectors>[\s\S]*?<host>)(.*?)(<\/host>)/,
            `$1${hostUrl}$3`
        );

        // Replace ONLY the <host> inside <sourceConnector>
        channelConfig = channelConfig.replace(
            /(<sourceConnector>[\s\S]*?<host>)(.*?)(<\/host>)/,
            `$1${ip}$3`
        );

        const cleanedFieldValidations = Object.keys(fieldValidations).reduce((acc, key) => {
            let cleanedKey = key.replace(/^tmp/, ''); // Remove "tmp" but keep bracket notation
            acc[cleanedKey] = fieldValidations[key];
            return acc;
        }, {});


        channelConfig = channelConfig
            .replace(/<id>.*?<\/id>/s, `<id>${channelId}</id>`)
            .replace(/<name>.*?<\/name>/s, `<name>${channelName}</name>`)
            .replace(/<contextPath>.*?<\/contextPath>/s, `<contextPath>${contextPath}</contextPath>`)
            .replace(/<port>.*?<\/port>/s, `<port>${port}</port>`);


        // channelConfig = channelConfig.replace(/<id>.*?<\/id>/s, `<id>${channelId}</id>`);
        // channelConfig = channelConfig.replace(/<name>.*?<\/name>/s, `<name>${channelName}</name>`);
        // channelConfig = channelConfig.replace(/<host>.*?<\/host>/s, `<host>${ip}</host>`);
        // channelConfig = channelConfig.replace(/<port>.*?<\/port>/s, `<port>${port}</port>`);

        // console.log('Generated channelId:', channelId);

        // Convert toggleValidation array to JavaScript code
        const toggleValidationScript = `
            var toggleValidation = ${JSON.stringify(toggleValidation)};
        `;

        console.log('toggleValidationScript: ', toggleValidationScript)

        const fieldValidationsScript = `
    var fieldValidations = ${JSON.stringify(cleanedFieldValidations)};
`;

        console.log('fieldValidationsScript: ', fieldValidationsScript);


        // Inject toggleValidation and validation logic into the preprocessing script
        const validationLogic = `
        <![CDATA[ 
    ${toggleValidationScript}

    ${fieldValidationsScript}
        

    try {
        var messageObj = JSON.parse(message);

        function validateField(messageObj, fieldPath) {
        
            // Evaluate the field path dynamically
            var fieldValue = eval('messageObj' + fieldPath);
            logger.info("fieldValue: " + fieldValue);

            // Check if the value is null or undefined
            return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
        } 

        // Loop through the toggleValidation array and validate each field
        var validationResults = toggleValidation.map(function(fieldPath) {
            return {
                fieldPath: fieldPath,
                isValid: validateField(messageObj, fieldPath)
            };
        });

        logger.info("Validation Results: " + JSON.stringify(validationResults));

        // Check for invalid fields and throw an error if any are invalid
        var invalidFields = validationResults.filter(function(result) {
            return !result.isValid;
        });

        if (invalidFields.length > 0) {
            throw 'Error: The following fields have invalid values: ' +
                JSON.stringify(invalidFields.map(function(result) {
                    return result.fieldPath;
            }));
        }



        function applyFieldValidations(fieldPath, rules) {
            var fieldValue;
            try {      
 			if (fieldPath.startsWith('[') || fieldPath.startsWith('msg')) {    
		        fieldValue = eval('messageObj' + fieldPath);
			 } else {
			    fieldValue = fieldPath;
			 }
             fieldValue = fieldValue.trim();
			 logger.info("Fileld value: " + fieldValue)
			 
            } catch (e) {
                logger.warn("Field not found: " + fieldPath);
                return false;
            }

            if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
                logger.warn("Skipping validation for empty value at: " + fieldPath);
                return true;
            }

            var validationFailed = false;

            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                var validationPassed = true;

                if (rule.validationType === "Max Length") {
                    var maxLength = parseInt(rule.value);
                    if (rule.operator === "<") {
                        validationPassed = fieldValue.length < maxLength;
                    } else if (rule.operator === "=") {
                        validationPassed = fieldValue.length === maxLength;
                    }
                } else if (rule.validationType === "Truncate") {
			    if (rule.operator === "=") {
			        var truncateLength = parseInt(rule.value);
			        if (fieldValue.length > truncateLength) {
			            fieldValue = fieldValue.substring(0, truncateLength); // Truncate the value
			            logger.info("Truncated field value: " + fieldValue);
			        }
			    }
			}
			 else if (rule.validationType === "Regex") {
			try {
			   var regexPattern = new RegExp(rule.value);
			   logger.info("Regex field value: " + fieldValue);
			   logger.info("Regex pattern value: " + regexPattern);
			   
			   validationPassed = regexPattern.test(fieldValue);
			
			   if (!validationPassed) {
			       logger.error("Regex validation failed for field: " + fieldPath + " | Value: " + fieldValue);
			   } else {
			       logger.info("Regex validation passed for field: " + fieldPath);
			   }
			} catch (regexError) {
			   logger.error("Invalid regex pattern: " + rule.value + " | Error: " + regexError);
			   validationPassed = false;
			}
		   }

           if (!validationPassed) {
            validationFailed = true;  
            }

            }
           return !validationFailed; 
        }




        // Process all field validations
        var fieldValidationErrors = [];
        Object.keys(fieldValidations).forEach(function(fieldPath) {
            var rules = fieldValidations[fieldPath];
            if (!applyFieldValidations(fieldPath, rules)) {
                fieldValidationErrors.push(fieldPath);
            }
        });

        if (fieldValidationErrors.length > 0) {
            throw 'Validation Error: Fields with errors -> ' + JSON.stringify(fieldValidationErrors);
        }



        // Return the original message
        return message;
    } 
        catch (e) {
        // Log the error for debugging
        logger.error('Preprocessor Script Error: ' + e);
        throw e; // Re-throw the error to stop processing
    }
       
            
        return message; ]]>

    `;

        channelConfig = channelConfig.replace(
            /<preprocessingScript>.*?<\/preprocessingScript>/s,
            `<preprocessingScript>${validationLogic}</preprocessingScript>`
        );



        // Generate the dynamic script based on the mappings
        const dynamicScript = Object.entries(updatedMappings)
            .map(([key, value]) => {
                // Check if the value starts with 'msg'
                // const formattedValue =
                //     value === `DateUtil.getCurrentDate('yyyyMMddHHmmss')` ?
                //     value // Keep DateUtil calls as is (no quotes)
                //     :
                //     value.startsWith('msg') ?
                //     value // Keep 'msg' references as is (no quotes)
                //     :
                //     `'${value.replace(/\\\\/g, '\\').replace(/'/g, "\\'")}'`;
                // const escapedKey = key.replace(/'/g, '&apos;');
                // const escapedValue = value.replace(/&/g, '&amp;').replace(/'/g, '&apos;');
                // return `${escapedKey} = ${escapedValue};`;
                // return `${key} = ${formattedValue};`;

                const formattedValue =
                    value === `DateUtil.getCurrentDate('yyyyMMddHHmmss')` ?
                    value // Keep DateUtil calls as is (no quotes)
                    :
                    value.startsWith('msg') ?
                    value // Keep 'msg' references as is (no quotes)
                    :
                    `'${value.replace(/\\\\/g, '\\').replace(/'/g, "\\'")}'`; // Wrap in quotes, reduce \\ to \, escape '

                // Escape the value for XML
                const escapedValue = formattedValue
                    .replace(/&/g, '&amp;') // Escape ampersand
                    .replace(/</g, '&lt;') // Escape less-than
                    .replace(/>/g, '&gt;') // Escape greater-than
                    .replace(/"/g, '&quot;') // Escape double quotes
                    .replace(/'/g, '&apos;'); // Escape single quotes for XML

                // Escape the key for XML
                const escapedKey = key.replace(/'/g, '&apos;');

                // Return the XML-safe script line
                return `${escapedKey} = ${escapedValue};`;
            })
            .join('\n');

        // console.log('Generated Script:', dynamicScript);

        // Inject the dynamic script into the channelConfig XML
        channelConfig = channelConfig.replace(
            /<script>.*?<\/script>/s, // Match the <script> tag content
            `<script>${dynamicScript}</script>`
        );

        // console.log("Updated Channel Config:", channelConfig);

        // Generate HL7 Template and replace in channelConfig
        const hl7Template = generateHL7Template(updatedMappings);
        channelConfig = channelConfig.replace(
            /<outboundTemplate encoding="base64">.*?<\/outboundTemplate>/s,
            `<outboundTemplate encoding="base64">${hl7Template}</outboundTemplate>`
        );


        const token = await getMirthToken();
        // console.log("token: login", token)


        //const newChannel = await createMirthChannel(token, channelConfig);
        console.log("Creating channel...")
        const newChannel = await createMirthChannel(channelConfig);

        // Return the generated randomId as channelId
        res.json({ message: 'Channel created successfully!', channelId: channelId, contextPath: contextPath });
    } catch (error) {
        console.error('Error creating channel:', error);
        // res.status(400).json({ error: 'Failed to create channel/Port in use' });
        res.status(500).json({ error: 'Failed to create channel' });
    }
};

const deployChannel = async(req, res) => {
    try {
        const { channelId } = req.body;

        if (!channelId) {
            return res.status(400).json({ error: 'Channel ID is required' });
        }

        await deployMirthChannel(channelId);

        res.json({ message: 'Channel deployed successfully!', url: `http://${process.env.MIRTH_SERVER}:${port_allocated}` });
    } catch (error) {
        console.error('Error deploying channel:', error);
        res.status(500).json({ error: 'Failed to deploy channel' });
    }
};

const sendJSON = async(req, res) => {
    try {
        const { jsonFile, channelId } = req.body;

        latestMessages = ''

        if (!jsonFile || !channelId) {
            return res.status(400).json({ error: 'JSON file and Channel ID are required' });
        }



        const response = await sendJsonToChannel(jsonFile, channelId);
        res.json({ message: 'JSON sent successfully!', response });
    } catch (error) {
        console.error('Error sending JSON:', error.message);
        // Return the error message to the frontend
        res.status(400).json({ error: error.message });
    }
};

const receiveHL7Message = (req, res) => {
    try {
        const hl7Message = req.body; // Assuming JSON payload
        console.log("Received HL7 message:", hl7Message);

        // Ensure updates are handled properly
        latestMessages = hl7Message;

        console.log("Stored HL7 messages:", latestMessages);

        res.status(200).json({ message: 'HL7 message received and stored successfully!' });
    } catch (error) {
        console.error('Error processing HL7 message:', error.message);
        res.status(500).json({ error: 'Failed to process HL7 message' });
    }
};


const fetchHL7Messages = (req, res) => {
    console.log(" fetching...", latestMessages)
    res.status(200).json({ messages: latestMessages });
};




module.exports = {
    createChannel,
    deployChannel,
    sendJSON,
    receiveHL7Message,
    fetchHL7Messages
};





// const createAndDeployChannel = async(req, res) => {
//     // const { channelName, sourceDirectory, destinationDirectory, mappings } = req.body;
//     console.log("req: ", req.body)

//     const generateRandomId = () => {
//         // Generate a random 3-digit ID (100 to 999)
//         return Math.floor(100 + Math.random() * 900);
//     };

//     try {
//         console.log("req.body: ", req.body)

//         const { mappings } = req.body;

//         console.log("mappings: ", mappings)

//         const randomId = generateRandomId();
//         const ip = '0.0.0.0';
//         const port = '8083';


//         channelConfig = channelConfig.replace(/<id>.*?<\/id>/s, `<id>${randomId}</id>`);
//         channelConfig = channelConfig.replace(/<host>.*?<\/host>/s, `<host>${ip}</host>`);
//         channelConfig = channelConfig.replace(/<port>.*?<\/port>/s, `<port>${port}</port>`);

//         console.log('Generated randomId:', randomId);

//         // Generate the dynamic script based on the mappings
//         const dynamicScript = Object.entries(mappings)
//             .map(([key, value]) => {
//                 // Check if the value starts with 'msg'
//                 const formattedValue = value.startsWith('msg') ? value : `'${value}'`;
//                 const escapedKey = key.replace(/'/g, '&apos;');
//                 const escapedValue = formattedValue.replace(/'/g, '&apos;');
//                 return `${escapedKey} = ${escapedValue};`;
//                 // return `${key} = ${formattedValue};`;
//             })
//             .join('\n');

//         console.log('Generated Script:', dynamicScript);

//         // Inject the dynamic script into the channelConfig XML
//         channelConfig = channelConfig.replace(
//             /<script>.*?<\/script>/s, // Match the <script> tag content
//             `<script>${dynamicScript}</script>`
//         );

//         console.log("Updated Channel Config:", channelConfig);

//         const token = await getMirthToken();
//         console.log("token: login", token)


//         //const newChannel = await createMirthChannel(token, channelConfig);
//         console.log("Creating channel...")
//         const newChannel = await createMirthChannel(channelConfig);
//         // console.log("newChannel: ", newChannel.id)
//         await deployMirthChannel(randomId);

//         res.json({ message: 'Channel created and deployed successfully!', channelId: randomId });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create or deploy channel' });
//     }
// };