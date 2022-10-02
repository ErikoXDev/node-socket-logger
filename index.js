const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var URLSafeBase64 = require('urlsafe-base64');

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SocketLog</title>
    <style>
      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
      button { margin: 8px; padding: 4px; font-size: 1.5em;}
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages > li { padding: 0.5rem 1rem; }
      #messages > li:nth-child(odd) { background: #efefef; }
    </style>
  </head>
  <body>
    <button id="clear">Clear</button>
    <div id="messages"></div>
  </body>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();
    var messages = document.getElementById('messages');
    socket.on("chat", function(msg) {
      var item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    })
  
    document.getElementById("clear").addEventListener("click", function(e) {
      messages.innerHTML = ""
    })
  </script>
  </html>`);
});
app.get('/chat/:message', (req,res) => {
  io.emit("chat", URLSafeBase64.decode(req.params.message).replace("\n", "<br>"))
  res.send("Sent ig")
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('http://localhost:3000');
});