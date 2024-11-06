// script.js
let ws;
let playerName;

function joinGame() {
    playerName = document.getElementById("username").value;
    if (!playerName) {
        alert("Por favor, insira seu nome!");
        return;
    }

    ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
        ws.send(JSON.stringify({ type: "join", name: playerName }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "tema") {
            document.getElementById("login").style.display = "none";
            document.getElementById("game").style.display = "block";
            document.getElementById("temaAtual").innerText = data.tema;
        } else if (data.type === "fim") {
            document.getElementById("resultados").innerHTML = `<h3>Fim do Jogo! Pontuações:</h3>` +
                Object.entries(data.pontuacao).map(([name, pontos]) => `<p>${name}: ${pontos} pontos</p>`).join('');
        }
    };
}

function enviarPalavra() {
    const palavra = document.getElementById("palavra").value;
    if (palavra) {
        ws.send(JSON.stringify({ type: "palavra", name: playerName, palavra }));
        document.getElementById("palavra").value = "";
    }
}
