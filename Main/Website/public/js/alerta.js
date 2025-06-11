var alertas = [];

function obterdados(idTalhao) {
    fetch(`/medidas/tempo-real/${idTalhao}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idTalhao);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idTalhao} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idTalhao) {
    var umd = resposta[0].umidade;

    var grauDeAviso = '';

    var limites = {
        excesso: 80,
        idealMaximo: 79,
        idealMinimo: 51,
        escassez: 50,
    };

    var classe_umidade = 'cor-alerta';

    if (umd >= limites.excesso) {
        classe_umidade = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo excesso de umidade'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(umd, idTalhao, grauDeAviso, grauDeAvisoCor)
    }
    else if (umd < limites.excesso && umd > limites.escassez) {
        classe_umidade = 'cor-alerta ideal';
        removerAlerta(idTalhao);
    }
    else if (umd <= limites.escassez) {
        classe_umidade = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo escassez de umidade'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(umd, idTalhao, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`umd_talhao${idTalhao}`) != null) {
        document.getElementById(`umd_talhao${idTalhao}`).innerHTML = umd + "%";
    }

    if (document.getElementById(`card_${idTalhao}`)) {
        card = document.getElementById(`card_${idTalhao}`)
        card.className = classe_umidade;
    }
}

function exibirAlerta(umd, idTalhao, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idTalhao == idTalhao);

    if (indice >= 0) {
        alertas[indice] = { idTalhao, umd, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idTalhao, umd, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idTalhao) {
    alertas = alertas.filter(item => item.idTalhao != idTalhao);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idTalhao, umd, grauDeAviso, grauDeAvisoCor }) {

    var descricao = JSON.parse(sessionStorage.TALHOES).find(item => item.idTalhao == idTalhao).descricao;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
            <small>umidade capturada: ${umd}°C.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}

function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.TALHOES).forEach(item => {
        obterdados(item.id)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}