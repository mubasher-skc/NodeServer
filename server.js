const WebSocket = require('ws');

// Create a new WebSocket server listening on port 8080
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log('WebSocket server is running on ws://localhost:8080');
});

// When a client connects
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Listen for messages from the connected client or webservice
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // If the message is coming from your webservice, it should be a JSON payload
        // containing emotion and emotionWeight.
        // We broadcast it to all connected clients (for example, your Unity client).
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
