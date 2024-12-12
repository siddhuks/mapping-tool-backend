const { getMirthToken, createMirthChannel, deployMirthChannel } = require('./mirthService');
let channelConfig = require('./channelConfig');


const createChannel = async(req, res) => {
    // const { channelName, sourceDirectory, destinationDirectory, mappings } = req.body;
    console.log("req: ", req.body)

    const generateRandomId = () => {
        // Generate a random 3-digit ID (100 to 999)
        return Math.floor(100 + Math.random() * 900);
    };

    try {
        console.log("req.body: ", req.body)

        const { mappings } = req.body;

        console.log("mappings: ", mappings)

        const randomId = generateRandomId();
        const ip = '0.0.0.0';
        const port = '8082';


        channelConfig = channelConfig.replace(/<id>.*?<\/id>/s, `<id>${randomId}</id>`);
        channelConfig = channelConfig.replace(/<host>.*?<\/host>/s, `<host>${ip}</host>`);
        channelConfig = channelConfig.replace(/<port>.*?<\/port>/s, `<port>${port}</port>`);

        console.log('Generated randomId:', randomId);

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
        res.json({ message: 'Channel created successfully!', channelId: randomId });
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

        res.json({ message: 'Channel deployed successfully!' });
    } catch (error) {
        console.error('Error deploying channel:', error);
        res.status(500).json({ error: 'Failed to deploy channel' });
    }
};



module.exports = {
    createChannel,
    deployChannel
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