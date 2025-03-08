class TableEntry {
    constructor(id, dataInicial, dataFinal) {
        this.id = id;
        this.dataInicial = new Date(dataInicial);  // Convertendo string ou valor para Date
        this.dataFinal = new Date(dataFinal);      // Convertendo string ou valor para Date
    }

    getId() {
        return this.id;
    }

    getDataInicial() {
        return this.dataInicial;
    }

    getDataFinal() {
        return this.dataFinal;
    }
}

const table = [
    new TableEntry(1, '2024-01-01', '2024-12-31'),
    new TableEntry(2, '2024-10-15', '2025-02-15'),
    new TableEntry(3, '2025-01-01', '2025-06-30'),
    new TableEntry(4, '2025-08-15', '2025-12-31')
];

// Função Filter
function filter(table, pInicial = null, pFim = null) {
    return table.filter(entry => {
        const dataInicialCond = pInicial ? entry.getDataInicial() > pInicial : true;
        const dataFinalCond = pFim ? entry.getDataFinal() < pFim : true;
        return dataInicialCond && dataFinalCond;
    });
}

// Exemplo de uso
const pInicial = new Date(); // Data atual
const result = filter(table, pInicial);

// Exibindo os resultados
result.forEach(entry => {
    console.log(`Id: ${entry.getId()}, Data Inicial: ${entry.getDataInicial()}, Data Final: ${entry.getDataFinal()}`);
});
