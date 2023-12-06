import pkg from 'ws';
const { Server } = pkg;

const wss = new Server({port: 3000});

wss.on("connection", function connection(ws) {
    ws.on("message", function message(message) {
        const data = JSON.parse(message);

        if (data.type === "message") {
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === pkg.OPEN) {
              client.send(JSON.stringify({ type: "message", data: data.data }));
            }
          });
        }
    });
});