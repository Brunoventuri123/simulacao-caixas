let boxId = 0;
let simulationInterval;

function startSimulation() {
    const simulationContainer = document.getElementById('simulation-container');
    const startButton = document.getElementById('startButton');

    startButton.disabled = true;  // Evita múltiplas simulações
    boxId = 0;

    simulationInterval = setInterval(() => {
        const box = createBoxElement();
        simulationContainer.appendChild(box);

        const startTime = new Date();
        animateBox(box, startTime);
    }, 1000);  // Intervalo de 1 segundo para cada caixa
}

function createBoxElement() {
    const box = document.createElement('div');
    box.classList.add('box');
    box.id = `box-${++boxId}`;
    box.style.left = '0px';
    return box;
}

function animateBox(box, startTime) {
    const simulationContainer = document.getElementById('simulation-container');
    const containerWidth = simulationContainer.offsetWidth;

    let position = 0;
    const interval = setInterval(() => {
        if (position >= containerWidth) {
            clearInterval(interval);
            simulationContainer.removeChild(box);

            const endTime = new Date();
            const passageTime = ((endTime - startTime) / 1000).toFixed(2);
            addDataToTable(box.id, endTime, passageTime);
        } else {
            position += 5;
            box.style.left = `${position}px`;
        }
    }, 20);
}

function addDataToTable(id, endTime, passageTime) {
    const tableBody = document.querySelector('#data-table tbody');
    const row = document.createElement('tr');

    const formattedTime = endTime.toLocaleTimeString('pt-BR', { hour12: false });
    row.innerHTML = `<td>${id}</td><td>${formattedTime}</td><td>${passageTime}</td>`;

    tableBody.appendChild(row);
}
