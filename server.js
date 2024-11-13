const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Handle socket connection
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  // Handle incoming message
  socket.on("chat message", (msg) => {
    console.log("message:", msg);
    io.emit("chat message", msg); // Broadcast message to all clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

// Listen on port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
