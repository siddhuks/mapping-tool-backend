require('dotenv').config();
const app = require('./src/app');
// const http = require('http');
// const socketIo = require('socket.io');

// const server = http.createServer(app);

// const io = socketIo(server, {
//     cors: {
//         origin: '*', // Adjust as needed for security
//         methods: ['GET', 'POST'],
//     },
// });

// app.set('io', io);

// io.on('connection', (socket) => {
//     console.log(`A user connected: ${socket.id}`);

//     socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.id}`);
//     });
// });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});