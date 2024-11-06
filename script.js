let codigoAtual = 0;
let ultimoTimestamp = null; // Armazena o timestamp da última entrada de caixa

function doGet() {
    return HtmlService.createHtmlOutputFromFile('Index');
}

function addRowToSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    codigoAtual++; // Incrementa o código da caixa
    const timestamp = new Date();
    
    // Calcula o tempo decorrido em segundos desde a última caixa
    let tempoEntreCaixas = ultimoTimestamp ? (timestamp - ultimoTimestamp) / 1000 : 0;
    ultimoTimestamp = timestamp;

    // Adiciona uma nova linha com código, data e hora atual, e o tempo entre caixas
    sheet.appendRow([codigoAtual, timestamp, tempoEntreCaixas > 0 ? tempoEntreCaixas.toFixed(2) + ' s' : 'Primeira Caixa']);
    return `Caixa ${codigoAtual} registrada!`;
}

function resetCodes() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clear(); // Limpa todos os dados da planilha
    sheet.appendRow(['Código', 'Data e Hora', 'Tempo entre Caixas']); // Adiciona cabeçalho
    codigoAtual = 0; // Reinicia o código para 0
    ultimoTimestamp = null; // Reseta o timestamp
    return 'Códigos reiniciados com sucesso!';
}
