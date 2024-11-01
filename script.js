let itemId = 0;
let simulationInterval;
let totalCount = 0;
const productionData = [];

function startSimulation() {
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;

    simulationInterval = setInterval(() => {
        createAndAnimateItem();
    }, 1000);
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
    totalCount += 1;
    const passageTime = new Date();
    recordItemData(itemId, passageTime, totalCount);
    
    item.addEventListener('animationend', () => {
        simulationContainer.removeChild(item);
    });
}

function recordItemData(id, passageTime, total) {
    const formattedTime = passageTime.toLocaleTimeString('pt-BR', { hour12: false });
    const tableBody = document.querySelector('#data-table tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `<td>Item-${id}</td><td>${formattedTime}</td><td>${total}</td>`;
    tableBody.appendChild(row);

    productionData.push(total);
    updateChart();
}

function updateChart() {
    const chart = Chart.getChart("productionChart");
    if (chart) {
        chart.data.labels.push(new Date().toLocaleTimeString('pt-BR', { hour12: false }));
        chart.data.datasets[0].data.push(totalCount);
        chart.update();
    }
}

const ctx = document.getElementById('productionChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Total de Itens Produzidos',
            data: [],
            borderColor: '#007bff',
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { display: true },
            y: { beginAtZero: true }
        }
    }
});
