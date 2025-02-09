require('dotenv').config();
const app = require('./app');
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

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});