function testandoUpdate(){
    var hectare = escolha_hectare.value;
    for(var i = 0; i < 4; i++){
        var div = document.getElementsByClassName('div_container_sensor')[i];
        div.innerHTML = `<canvas id="sensor${i}"></canvas>`;
    }
    startChart(hectare);
    updateSituacao();
}

function updateSituacao(){
    ultimoNumeroSensorA = valoresSensorA[valoresSensorA.length - 1];
    ultimoNumeroSensorB = valoresSensorB[valoresSensorB.length - 1];
    ultimoNumeroSensorC = valoresSensorC[valoresSensorC.length - 1];
    ultimoNumeroSensorD = valoresSensorD[valoresSensorD.length - 1];
    vetorUltimoDado = [ultimoNumeroSensorA, ultimoNumeroSensorB, ultimoNumeroSensorC, ultimoNumeroSensorD];

    for(var i = 0; i < 4; i++){
        var span = document.getElementsByClassName('situacao_sensor')[i];
        if(vetorUltimoDado[i] > 80){
            span.innerHTML = `<span style='color: red'>Excesso de Umidade</span>`;
        } else if(vetorUltimoDado[i] < 50){
            span.innerHTML = `<span style='color: red'>Escassez de Umidade</span>`;
        } else {
            span.innerHTML = `<span>Padrão</span>`;
        }
    }
}

//  class="umidade_alarme"

function startChart(hectare_sensores) {

    if (hectare_sensores == 2) {
        valoresSensorA = [67, 65, 65, 64, 66, 67];
        valoresSensorB = [55, 57, 59, 60, 61, 60];
        valoresSensorC = [67, 69, 70, 72, 69, 68];
        valoresSensorD = [65, 64, 64, 65, 66, 65];
    } else if (hectare_sensores == 3) {
        valoresSensorA = [51, 52, 50, 47, 45, 46];
        valoresSensorB = [54, 53, 51, 48, 46, 44];
        valoresSensorC = [55, 54, 55, 53, 55, 52];
        valoresSensorD = [44, 46, 48, 48, 46, 44];
    } else if (hectare_sensores == 4) {
        valoresSensorA = [75, 79, 81, 83, 82, 84];
        valoresSensorB = [77, 79, 78, 79, 81, 83];
        valoresSensorC = [76, 78, 77, 75, 74, 75];
        valoresSensorD = [70, 72, 73, 75, 77, 76];
    } else if (hectare_sensores == 5) {
        valoresSensorA = [65, 66, 66, 65, 64, 64];
        valoresSensorB = [66, 68, 69, 71, 70, 71];
        valoresSensorC = [59, 61, 63, 61, 60, 59];
        valoresSensorD = [60, 62, 64, 65, 63, 66];
    } else {
        valoresSensorA = [51, 52, 52, 54, 55, 56];
        valoresSensorB = [75, 79, 83, 86, 81, 87];
        valoresSensorC = [54, 52, 52, 51, 50, 48];
        valoresSensorD = [60, 62, 64, 65, 63, 66];
    }

    updateSituacao();

    var sensorA = new Chart(document.getElementById('sensor0').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['07:00', '07:01', '07:02', '07:03', '07:04', '07:05'],
            datasets: [{
                label: 'Sensor A',
                data: valoresSensorA,
                borderColor: 'green',
                backgroundColor: 'green'
            },
            {
                label: 'Umidade Mínima (%)',
                data: [50, 50, 50, 50, 50, 50],
                borderColor: 'blue',
                backgroundColor: 'blue'
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
    const sensorB = new Chart(document.getElementById('sensor1').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['07:00', '07:01', '07:02', '07:03', '07:04', '07:05'],
            datasets: [{
                label: 'Sensor B',
                data: valoresSensorB,
                borderColor: 'green',
                backgroundColor: 'green'
            },
            {
                label: 'Umidade Mínima (%)',
                data: [50, 50, 50, 50, 50, 50],
                borderColor: 'blue',
                backgroundColor: 'blue'
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
    const sensorC = new Chart(document.getElementById('sensor2').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['07:00', '07:01', '07:02', '07:03', '07:04', '07:05'],
            datasets: [{
                label: 'Sensor C',
                data: valoresSensorC,
                borderColor: 'green',
                backgroundColor: 'green'
            },
            {
                label: 'Umidade Mínima (%)',
                data: [50, 50, 50, 50, 50, 50],
                borderColor: 'blue',
                backgroundColor: 'blue'
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
    const sensorD = new Chart(document.getElementById('sensor3').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['07:00', '07:01', '07:02', '07:03', '07:04', '07:05'],
            datasets: [{
                label: 'Sensor D',
                data: valoresSensorD,
                borderColor: 'green',
                backgroundColor: 'green'
            },
            {
                label: 'Umidade Mínima (%)',
                data: [50, 50, 50, 50, 50, 50],
                borderColor: 'blue',
                backgroundColor: 'blue'
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

/*
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
*/
}