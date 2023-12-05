const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
}

const getDataAnalysis = (req, res, db) => {
    res.json({
        "total": "573",
        "closed": "472",
        "nps": "1.52%",
        "count_by_month": [
            { "month": "Janeiro", "count": 20 },
            { "month": "Fevereiro", "count": 30 },
            { "month": "Março", "count": 31 },
            { "month": "Abril", "count": 21 },
            { "month": "Maio", "count": 35 },
            { "month": "Junho", "count": 21 },
            { "month": "Julho", "count": 53 },
            { "month": "Agosto", "count": 97 },
            { "month": "Setembro", "count": 83 },
            { "month": "Outubro", "count": 58 },
            { "month": "Novembro", "count": 96 },
        ],
        "notes_by_month": [
            { "month": "Janeiro", "avg": 3.60 },
            { "month": "Fevereiro", "avg": 4.24 },
            { "month": "Março", "avg": 5.13 },
            { "month": "Abril", "avg": 9.95 },
            { "month": "Maio", "avg": 9.54 },
            { "month": "Junho", "avg": 3.14 },
            { "month": "Julho", "avg": 2.19 },
            { "month": "Agosto", "avg": 3.11 },
            { "month": "Setembro", "avg": 2.32 },
            { "month": "Outubro", "avg": 2.84 },
            { "month": "Novembro", "avg": 8.33 },
        ],
        "service_time_by_month": [
            { "month": "Janeiro", "avg": 9.07 },
            { "month": "Fevereiro", "avg": 4.69 },
            { "month": "Março", "avg": 3.58 },
            { "month": "Abril", "avg": 2.76 },
            { "month": "Maio", "avg": 5.26 },
            { "month": "Junho", "avg": 7.45 },
            { "month": "Julho", "avg": 6.25 },
            { "month": "Agosto", "avg": 4.92 },
            { "month": "Setembro", "avg": 4.02 },
            { "month": "Outubro", "avg": 5.30 },
            { "month": "Novembro", "avg": 9.33 },
        ],
        "count_by_state": [
            { "name": "DF", "count": 3, "fill": getRandomColor() },
            { "name": "CE", "count": 7, "fill": getRandomColor() },
            { "name": "MS", "count": 9, "fill": getRandomColor() },
            { "name": "PE", "count": 18, "fill": getRandomColor() },
            { "name": "MG", "count": 432, "fill": getRandomColor() },
        ],
        "count_by_reason": [
            { "reason": "Multa/Cancelamento", "count": 224 },
            { "reason": "Outros", "count": 55 },
            { "reason": "Economia", "count": 36 },
            { "reason": "Prazo de conexão", "count": 35 },
            { "reason": "Resgate", "count": 29 },
            { "reason": "Cobrança Indevida", "count": 26 },
            { "reason": "Portal/App", "count": 19 },
            { "reason": "Consumo - baixa injeção", "count": 15 },
            { "reason": "Atendimento", "count": 9 },
            { "reason": "Indicação", "count": 8 },
        ]
    })
}

module.exports = {
    getDataAnalysis
}