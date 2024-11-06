// server.js
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const temas = ["comida", "animal", "esporte", "cidade", "cor", "fruta", "filme", "país", "bebida", "instrumento"];
let rodadaAtual = 0;
let pontuacao = {};
let jogadores = [];

function novoTema() {
    return temas[rodadaAtual % temas.length];
}

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.type === "join") {
            if (jogadores.length < 2) {
                jogadores.push(data.name);
                pontuacao[data.name] = 0;
                
                ws.send(JSON.stringify({
                    type: "tema",
                    tema: novoTema()
                }));
            }
        } else if (data.type === "palavra") {
            const pontos = data.palavra.length;
            pontuacao[data.name] += pontos;

            if (rodadaAtual >= 9) {
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: "fim",
                            pontuacao
                        }));
                    }
                });
            } else {
                rodadaAtual++;
                const tema = novoTema();
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: "tema",
                            tema
                        }));
                    }
                });
            }
        }
    });
});

server.listen(8080, () => console.log('Server is running on port 8080'));

