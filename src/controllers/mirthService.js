const axios = require('axios');
const https = require('https');

const mirthBaseURL = `https://${process.env.MIRTH_SERVER}:8443/api`;
const mirthUsername = 'admin';
const mirthPassword = 'admin';

// Get Mirth API Token
const getMirthToken = async() => {
    try {
        const response = await axios.post(
            `${mirthBaseURL}/users/_login`, { username: mirthUsername, password: mirthPassword }, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            }
        );
        // console.log("response: login", response)
        return response.data;
    } catch (error) {
        console.error('Error authenticating with Mirth:', error.message);
        throw error;
    }
};

// Create Mirth Channel
const createMirthChannel = async(channelConfig) => {
    try {
        const encodedCredentials = Buffer.from(`${mirthUsername}:${mirthPassword}`).toString('base64');
        const response = await axios.post(
            `${mirthBaseURL}/channels`,
            channelConfig, {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/xml',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            }
        );
        console.log("Created channel: ", response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating Mirth channel:', error.message);
        console.error('Error Details:', error.response.data || error.toJSON());
        throw error;
    }
};

// Deploy Mirth Channel
const deployMirthChannel = async(channelId) => {
    try {
        console.log("channelID: ", channelId)
        const encodedCredentials = Buffer.from(`${mirthUsername}:${mirthPassword}`).toString('base64');
        await axios.post(
            `${mirthBaseURL}/channels/${channelId}/_deploy`,
            null, {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/xml',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            }
        );
        console.log('Channel deployed successfully!');
    } catch (error) {
        console.error('Error deploying Mirth channel:', error.message);
        console.error('Error Details:', error.response.data || error.toJSON());
        throw error;
    }
};

const sendJsonToChannel = async(jsonFile, channelId) => {
    try {
        const encodedCredentials = Buffer.from(`${mirthUsername}:${mirthPassword}`).toString('base64');
        const url = `${mirthBaseURL}/channels/${encodeURIComponent(channelId)}/messages`;

        console.log("jsonfile: ", jsonFile)
        console.log("urlll: ", url)
            // const destinationMetaDataId = [2];

        const response = await axios.post(
            url,
            jsonFile, {
                params: { destinationMetaDataId: 2 },
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                    'Content-Type': 'text/plain',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            }
        );

        console.log('JSON sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending JSON to channel:', error.message);
        console.error('Details:', error.response.data || error.toJSON());
        throw error;
    }
};


module.exports = {
    getMirthToken,
    createMirthChannel,
    deployMirthChannel,
    sendJsonToChannel,
};