var quantidade_sensores = 4;
var horario = ['07:00', '07:01', '07:02', '07:03', '07:04', '07:05'];

function testandoUpdate(){
    var hectare = escolha_hectare.value;
    for(var i = 0; i < quantidade_sensores; i++){
        var div = document.getElementsByClassName('div_container_sensor')[i];
        div.innerHTML = `<canvas id="sensor${i}"></canvas>`;
    }
    startChart(hectare);
    updateSituacao();
}

function updateSituacao(){
    var ultimoNumeroSensorA = valoresSensorA[valoresSensorA.length - 1];
    var ultimoNumeroSensorB = valoresSensorB[valoresSensorB.length - 1];
    var ultimoNumeroSensorC = valoresSensorC[valoresSensorC.length - 1];
    var ultimoNumeroSensorD = valoresSensorD[valoresSensorD.length - 1];
    var vetorUltimoDado = [ultimoNumeroSensorA, ultimoNumeroSensorB, ultimoNumeroSensorC, ultimoNumeroSensorD];
    var contadorEscassez = 0;
    var contadorExcesso = 0;
    
    for(var i = 0; i < quantidade_sensores; i++){
        var span = document.getElementsByClassName('situacao_sensor')[i];
        if(vetorUltimoDado[i] > 80){
            span.innerHTML = `<span style='color: red'><b>Excesso de Umidade</b></span>`;
            contadorExcesso++;
        } else if(vetorUltimoDado[i] < 50){
            span.innerHTML = `<span style='color: red'><b>Escassez de Umidade</b></span>`;
            contadorEscassez++;
        } else {
            span.innerHTML = `<span>Padrão</span>`;
        }
    }

    var contadorPadrao = quantidade_sensores - contadorEscassez - contadorExcesso;
    
    var porcentPadrao = (contadorPadrao / quantidade_sensores) * 100;
    var porcentEscassez = (contadorEscassez / quantidade_sensores) * 100;
    var porcentExcesso = (contadorExcesso / quantidade_sensores) * 100;

    padrao_span.innerHTML = `${contadorPadrao} | (${porcentPadrao}%)`;
    excesso_span.innerHTML = `${contadorExcesso} | (${porcentExcesso}%)`;
    escassez_span.innerHTML = `${contadorEscassez} | (${porcentEscassez}%)`;

    const ctxDonut = document.getElementById('donut').getContext('2d');

if (window.graficoDonutInstance) {
    window.graficoDonutInstance.destroy();
}

window.graficoDonutInstance = new Chart(ctxDonut, {
    type: 'doughnut',
    data: {
        labels: ['Padrão', 'Escassez', 'Excesso'],
        datasets: [{
            data: [contadorPadrao, contadorEscassez, contadorExcesso],
            backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Situação dos Sensores'
            }
        }
    }
});

}

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
            labels: horario,
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
            labels: horario,
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
            labels: horario,
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
            labels: horario,
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
    
}
   
function alarmHorario(){
    if(valoresSensorA[0] > 80){
        vetor
    }
}