let boxId = 0;
let simulationInterval;

function startSimulation() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    
    startButton.disabled = true;
    stopButton.disabled = false;

    simulationInterval = setInterval(() => {
        createAndAnimateBox();
    }, 1000);  // Cria uma nova caixa a cada segundo
}

function stopSimulation() {
    clearInterval(simulationInterval);
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}

function createAndAnimateBox() {
    const simulationContainer = document.getElementById('simulation-container');
    const box = document.createElement('div');
    box.classList.add('box');
    boxId += 1;
    box.setAttribute('data-id', `Caixa-${boxId}`);
    
    simulationContainer.appendChild(box);
    const passageTime = new Date();
    recordBoxData(boxId, passageTime);
    
    // Remove a caixa da tela após a animação
    box.addEventListener('animationend', () => {
        simulationContainer.removeChild(box);
    });
}

function recordBoxData(id, passageTime) {
    const formattedTime = passageTime.toLocaleTimeString('pt-BR', { hour12: false });
    const tableBody = document.querySelector('#data-table tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `<td>Caixa-${id}</td><td>${formattedTime}</td>`;
    tableBody.appendChild(row);
}
