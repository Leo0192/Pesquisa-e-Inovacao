var quantidade_sensores = 4;
var horario = ['07:00', '07:01', '07:02', '07:03', '07:04', '07:05'];
var hectare = 0;

function updateTalhao() {
    hectare = escolha_hectare.value;
    for (var i = 0; i < quantidade_sensores; i++) {
        var div = document.getElementsByClassName('div_container_sensor')[i];
        if (hectare == 6) {
            div.innerHTML = `<canvas id="myChart${i + 1}"></canvas>`;
        } else {
            div.innerHTML = `<canvas id="sensor${i + 1}"></canvas>`;
        }
    }

    const situacoes = document.querySelectorAll('.descricao_situacao');

    if (document.getElementById('escolha_hectare').value === '6') {
    situacoes.forEach(s => s.style.display = 'none');
    } else {
    situacoes.forEach(s => s.style.display = 'block');
    }


    startChart(hectare);
    updateSituacao();
}

function updateSituacao() {
    var ultimoNumeroSensorA = valoresSensorA[valoresSensorA.length - 1];
    var ultimoNumeroSensorB = valoresSensorB[valoresSensorB.length - 1];
    var ultimoNumeroSensorC = valoresSensorC[valoresSensorC.length - 1];
    var ultimoNumeroSensorD = valoresSensorD[valoresSensorD.length - 1];
    var vetorUltimoDado = [ultimoNumeroSensorA, ultimoNumeroSensorB, ultimoNumeroSensorC, ultimoNumeroSensorD];
    var contadorEscassez = 0;
    var contadorExcesso = 0;


    for (var i = 0; i < quantidade_sensores; i++) {
        var span = document.getElementsByClassName('situacao_sensor')[i];
        if (vetorUltimoDado[i] > 80) {
            span.innerHTML = `<span class="coloracao-excesso"><b>Excesso de Umidade</b></span>`;
            contadorExcesso++;
        } else if (vetorUltimoDado[i] < 50) {
            span.innerHTML = `<span class="coloracao-escassez"><b>Escassez de Umidade</b></span>`;
            contadorEscassez++;
        } else {
            span.innerHTML = `<span class="coloracao-padrao">Padrão</span>`;
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
    } else if (hectare_sensores == 6) {
        referencia = [77, 75, 76, 74, 75, 73, 71, 68, 71, 73, 73, 74];
        ano2023 = [75, 72, 73, 71, 72, 71, 71, 66, 70, 74, 74, 73];
        ano2024 = [78, 76, 77, 74, 75, 74, 74, 70, 73, 74, 74, 75];
        ano2025 = [76, 77, 74, 77, 0, 0, 0, 0, 0, 0, 0, 0];
    } else {
        valoresSensorA = [51, 52, 50, 47, 45, 46];
        valoresSensorB = [54, 53, 51, 48, 46, 44];
        valoresSensorC = [55, 54, 55, 53, 55, 52];
        valoresSensorD = [44, 46, 48, 48, 46, 44];
    }

    updateSituacao();

    if (hectare != 6) {
        var sensorA = new Chart(document.getElementById('sensor1').getContext('2d'), {
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
                    borderColor: 'yellow',
                    backgroundColor: 'yellow'
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
                        max: 100,
                    },
                },
            }
        });
        const sensorB = new Chart(document.getElementById('sensor2').getContext('2d'), {
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
                    borderColor: 'yellow',
                    backgroundColor: 'yellow'
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
                        max: 100,
                    },
                },
            }
        });
        const sensorC = new Chart(document.getElementById('sensor3').getContext('2d'), {
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
                    borderColor: 'yellow',
                    backgroundColor: 'yellow'
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
                        max: 100,
                    },
                },
            }
        });
        const sensorD = new Chart(document.getElementById('sensor4').getContext('2d'), {
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
                    borderColor: 'yellow',
                    backgroundColor: 'yellow'
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
                        max: 100,
                    },
                },
            }
        });
    } else {
        const ctx = document.getElementById('myChart1');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Dados de referência de local de instalação',
                    data: referencia,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                    }
                }
            }
        });



        const ctx2 = document.getElementById('myChart2');

        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Média mensal - 2023',
                    data: ano2023,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                    }
                }
            }
        });



        const ctx3 = document.getElementById('myChart3');

        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Média mensal - 2024',
                    data: ano2024,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                    }
                }
            }
        });


        const ctx4 = document.getElementById('myChart4');

        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Média mensal - 2025',
                    data: ano2025,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                    }
                }
            }
        });
    }

    const alert1 = document.getElementById('donut_alerta1')

    new Chart(alert1, {
        type: 'doughnut',
        data: {
            labels: ['Padrão', 'Escassez', 'Excesso'],
            datasets: [{
                data: [25, 75, 0],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Situação dos Sensores (Talhão 1)'
                }
            }
        }
    });

    const alert2 = document.getElementById('donut_alerta2')

    new Chart(alert2, {
        type: 'doughnut',
        data: {
            labels: ['Padrão', 'Escassez', 'Excesso'],
            datasets: [{
                data: [100, 0, 0],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Situação dos Sensores (Talhão 2)'
                }
            }
        }
    });

    const alert3 = document.getElementById('donut_alerta3')

    new Chart(alert3, {
        type: 'doughnut',
        data: {
            labels: ['Padrão', 'Escassez', 'Excesso'],
            datasets: [{
                data: [25, 75, 0],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Situação dos Sensores (Talhão 3)'
                }
            }
        }
    });

    const alert4 = document.getElementById('donut_alerta4')

    new Chart(alert4, {
        type: 'doughnut',
        data: {
            labels: ['Padrão', 'Escassez', 'Excesso'],
            datasets: [{
                data: [50, 0, 50],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Situação dos Sensores (Talhão 4)'
                }
            }
        }
    });

    const alert5 = document.getElementById('donut_alerta5')

    new Chart(alert5, {
        type: 'doughnut',
        data: {
            labels: ['Padrão', 'Escassez', 'Excesso'],
            datasets: [{
                data: [100, 0, 0],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Situação dos Sensores (Talhão 5)'
                }
            }
        }
    });

}