const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server)

app.use(express.json());

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

// Importing routes
const userRoutes = require('./routes/users');
const bidRoutes = require('./routes/bids');

app.use('/api/users', userRoutes);
app.use('/api/bids', bidRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('placeBid', (bid) => {
    io.emit('newBid', bid); // Broadcast new bid to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});