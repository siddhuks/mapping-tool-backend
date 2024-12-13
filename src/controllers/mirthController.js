const { getMirthToken, createMirthChannel, deployMirthChannel, sendJsonToChannel } = require('./mirthService');
let channelConfig = require('./channelConfig');
const port = '8083';


const createChannel = async(req, res) => {

    try {
        console.log("req.body: ", req.body)

        const { user, selectedType, mappings } = req.body;

        console.log("mappings: ", mappings)

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

        console.log('Generated channelId:', channelId);

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
        console.log("token: login", token)


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
        res.status(500).json({ error: 'Failed to send JSON to the channel' });
    }
};




module.exports = {
    createChannel,
    deployChannel,
    sendJSON
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