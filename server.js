const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

// Servidor WebSocket para el chat
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    const msg = raw.toString().slice(0, 500); // limitar tamaño por seguridad

    // Reenviar el mensaje a todos MENOS al que lo envió
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.send("🟢 Bienvenido al chat!");
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
