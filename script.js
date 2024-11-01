let boxCount = 0;

function startSimulation() {
    const simulationContainer = document.getElementById('simulation-container');
    simulationContainer.innerHTML = '';  // Limpa as caixas anteriores
    boxCount = 0;

    setInterval(() => {
        // Cria uma nova caixa
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.left = '0px';
        simulationContainer.appendChild(box);

        const startTime = new Date();

        // Anima a caixa para passar pela tela
        let position = 0;
        const interval = setInterval(() => {
            if (position >= 300) {
                clearInterval(interval);
                simulationContainer.removeChild(box);

                // Registra o tempo de passagem da caixa
                const endTime = new Date();
                const passageTime = ((endTime - startTime) / 1000).toFixed(2);
                addDataToTable(passageTime);
            } else {
                position += 2;
                box.style.left = `${position}px`;
            }
        }, 20);
    }, 1000);  // Adiciona uma nova caixa a cada segundo
}

function addDataToTable(time) {
    boxCount++;
    const tableBody = document.querySelector('#data-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>Caixa ${boxCount}</td><td>${time} s</td>`;
    tableBody.appendChild(row);
}
