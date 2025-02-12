const { getMirthPortsInUse } = require('./mirthService'); // Fetch Mirth active ports

const allowedPorts = [8081, 8082, 8083];

async function isMirthPortInUse(port) {
    const mirthPorts = await getMirthPortsInUse();

    console.log("mirthPorts: ", mirthPorts)

    if (!Array.isArray(mirthPorts)) {
        console.error("Unexpected response format from Mirth API");
        return false;
    }

    console.log(`Checking if port ${port} is in use...`);
    return mirthPorts.includes(port);
}


async function allocatePort() {
    console.log("Fetching ports in use from Mirth...");

    for (const port of allowedPorts) {
        const isInUse = await isMirthPortInUse(port); // ✅ Use the function to check
        if (!isInUse) {
            console.log(`Allocating port: ${port}`);
            return port;
        }
    }

    console.warn("No available ports for allocation.");
    return null;
}



function deallocatePort(port) {
    console.log(`Deallocated port: ${port}`);
}

module.exports = { allocatePort, deallocatePort };