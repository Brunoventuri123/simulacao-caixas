let itemId = 0;
let simulationInterval;

function startSimulation() {
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;

    simulationInterval = setInterval(() => {
        createAndAnimateItem();
    }, 1000);  // Cria um novo item a cada segundo
}

function stopSimulation() {
    clearInterval(simulationInterval);
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}

function createAndAnimateItem() {
    const simulationContainer = document.getElementById('simulation-container');
    const item = document.createElement('div');
    item.classList.add('box');
    itemId += 1;
    item.setAttribute('data-id', `Item-${itemId}`);
    
    simulationContainer.appendChild(item);
    const passageTime = new Date();
    recordItemData(itemId, passageTime);
    
    // Remove o item da tela após a animação
    item.addEventListener('animationend', () => {
        simulationContainer.removeChild(item);
    });
}

function recordItemData(id, passageTime) {
    const formattedTime = passageTime.toLocaleTimeString('pt-BR', { hour12: false });
    const tableBody = document.querySelector('#data-table tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `<td>Item-${id}</td><td>${formattedTime}</td>`;
    
    // Limita o número de linhas na tabela para as últimas 10 entradas
    if (tableBody.children.length >= 10) {
        tableBody.removeChild(tableBody.firstChild);
    }

    tableBody.appendChild(row);
}
