const { getMirthToken, createMirthChannel, deployMirthChannel, sendJsonToChannel } = require('./mirthService');
let channelConfig = require('./channelConfig');
const port = '8084';

let latestMessage;


const createChannel = async(req, res) => {

    try {
        // console.log("req.body: ", req.body)

        const { user, selectedType, mappings, toggleValidation } = req.body;

        // console.log("mappings: ", mappings)

        console.log("toggleValidation: ", toggleValidation)

        if (!user || !selectedType) {
            return res.status(400).json({ error: 'User and Message Type are required' });
        }


        const channelId = `${user.username}-${selectedType}`;
        const channelName = `${user.username}_${selectedType}`;
        const contextPath = `/user/${user.username}/${selectedType}`;
        const ip = '0.0.0.0';

        channelConfig = channelConfig
            .replace(/<id>.*?<\/id>/s, `<id>${channelId}</id>`)
            .replace(/<name>.*?<\/name>/s, `<name>${channelName}</name>`)
            .replace(/<contextPath>.*?<\/contextPath>/s, `<contextPath>${contextPath}</contextPath>`)
            .replace(/<host>.*?<\/host>/s, `<host>${ip}</host>`)
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

        // Inject toggleValidation and validation logic into the preprocessing script
        const validationLogic = `
        <![CDATA[ 
    ${toggleValidationScript}
        

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
        const dynamicScript = Object.entries(mappings)
            .map(([key, value]) => {
                // Check if the value starts with 'msg'
                const formattedValue = value.startsWith('msg') ? value : `'${value}'`;
                const escapedKey = key.replace(/'/g, '&apos;');
                const escapedValue = formattedValue.replace(/'/g, '&apos;');
                return `${escapedKey} = ${escapedValue};`;
                // return `${key} = ${formattedValue};`;
            })
            .join('\n');

        console.log('Generated Script:', dynamicScript);

        // Inject the dynamic script into the channelConfig XML
        channelConfig = channelConfig.replace(
            /<script>.*?<\/script>/s, // Match the <script> tag content
            `<script>${dynamicScript}</script>`
        );

        console.log("Updated Channel Config:", channelConfig);

        const token = await getMirthToken();
        // console.log("token: login", token)


        //const newChannel = await createMirthChannel(token, channelConfig);
        console.log("Creating channel...")
        const newChannel = await createMirthChannel(channelConfig);

        // Return the generated randomId as channelId
        res.json({ message: 'Channel created successfully!', channelId: channelId, contextPath: contextPath });
    } catch (error) {
        console.error('Error creating channel:', error);
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

        res.json({ message: 'Channel deployed successfully!', url: `http://${process.env.MIRTH_SERVER}:${port}` });
    } catch (error) {
        console.error('Error deploying channel:', error);
        res.status(500).json({ error: 'Failed to deploy channel' });
    }
};

const sendJSON = async(req, res) => {
    try {
        const { jsonFile, channelId } = req.body;

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
        console.log("hl7Message: ", hl7Message)
        latestMessage = hl7Message;
        console.log("latestMessage: ", latestMessage)


        // Process the HL7 message as needed
        res.status(200).json({ message: 'HL7 message received and broadcasted successfully!' });
    } catch (error) {
        console.error('Error processing HL7 message:', error.message);
        res.status(500).json({ error: 'Failed to process HL7 message' });
    }
};

const fetchHL7Messages = (req, res) => {
    console.log(" fetching...", latestMessage)
    res.status(200).json({ messages: latestMessage });
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