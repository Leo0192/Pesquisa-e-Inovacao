function startChart() {

    var sensorA = new Chart(document.getElementById('sensorA').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['07:00','07:01','07:02','07:03','07:04', '07:05'],
            datasets: [{
                label: 'Sensor A',
                data: [55, 42, 37, 48, 56, 62],
                borderColor: '#63B1BC',
                backgroundColor: '#ED145B'
            },
            {
                label: 'Umidade Mínima (%)',
                data: [50, 50, 50, 50,50,50],
                borderColor: 'red',
                backgroundColor: 'red'
            },
            {
                label: 'Umidade Máxima (%)',
                data: [80, 80, 80, 80, 80, 80],
                borderColor: 'crimson',
                backgroundColor: 'crimson'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sensor A'
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(%)'
                    },
                    beginAtZero: true,
                },
            },
        }
    });
    var sensorB = new Chart(document.getElementById('sensorB').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['07:00','07:01','07:02','07:03','07:04', '07:05'],
            datasets: [{
                label: 'Sensor B',
                data: [75, 79, 83, 86, 81, 78],
                borderColor: '#63B1BC',
                backgroundColor: '#ED145B'
            },
            {
                label: 'Umidade Mínima (%)',
                data: [50, 50, 50, 50,50,50],
                borderColor: 'red',
                backgroundColor: 'red'
            },
            {
                label: 'Umidade Máxima (%)',
                data: [80, 80, 80, 80, 80, 80],
                borderColor: 'crimson',
                backgroundColor: 'crimson'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sensor B'
                    },
                    beginAtZero: true,
                },
                y: {
                    title: {
                        display: true,
                        text: '(%)'
                    },
                    beginAtZero: true,
                },
            },
        }
    });
    var sensorC = new Chart(document.getElementById('sensorC').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['07:00','07:01','07:02','07:03','07:04', '07:05'],
            datasets: [{
                label: 'Sensor C',
                data: [59, 55, 57, 59, 56, 59],
                borderColor: '#63B1BC',
                backgroundColor: '#ED145B'
            },
            {
                label: 'Umidade Mínima (%)',
                data: [50, 50, 50, 50,50,50],
                borderColor: 'red',
                backgroundColor: 'red'
            },
            {
                label: 'Umidade Máxima (%)',
                data: [80, 80, 80, 80, 80, 80],
                borderColor: 'crimson',
                backgroundColor: 'crimson'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sensor C'
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(%)'
                    },
                    beginAtZero: true,
                },
            },
        }
    });
    var sensorD = new Chart(document.getElementById('sensorD').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['07:00','07:01','07:02','07:03','07:04', '07:05'],
            datasets: [{
                label: 'Sensor D',
                data: [60, 62, 60, 65, 63, 66],
                borderColor: '#63B1BC',
                backgroundColor: '#ED145B'
            },
            {
                label: 'Umidade Mínima (%)',
                data: [50, 50, 50, 50,50,50],
                borderColor: 'red',
                backgroundColor: 'red'
            },
            {
                label: 'Umidade Máxima (%)',
                data: [80, 80, 80, 80, 80, 80],
                borderColor: 'crimson',
                backgroundColor: 'crimson'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sensor D'
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(%)'
                    },
                    beginAtZero: true,
                },
            },
        }
    });

    var paginacao = {};
    var tempo = {};

    function obterDados(grafico, endpoint) {
        fetch('http://localhost:3300/sensores/' + endpoint)
            .then(response => response.json())
            .then(valores => {
                if (paginacao[endpoint] == null) {
                    paginacao[endpoint] = 0;
                }
                if (tempo[endpoint] == null) {
                    tempo[endpoint] = 0;
                }

                var ultimaPaginacao = paginacao[endpoint];
                paginacao[endpoint] = valores.length;
                valores = valores.slice(ultimaPaginacao);

                valores.forEach((valor) => {
                    if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
                        grafico.data.labels.shift();
                        grafico.data.datasets[0].data.shift();
                    }

                    grafico.data.labels.push(tempo[endpoint]++);
                    grafico.data.datasets[0].data.push(parseFloat(valor));
                    grafico.update();
                });
            })
            .catch(error => console.error('Erro ao obter dados:', error));
    }

    setInterval(() => {
        obterDados(sensorA, 'A');
        obterDados(sensorB, 'B');
        obterDados(sensorC, 'C');
        obterDados(sensorD, 'D');
    }, 1000);
}