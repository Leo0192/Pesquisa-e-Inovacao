function Calcular() {
    hectares = Number(ipt_quantidade_hectares.value);
    valor_saca = 128; // valor de cada saca de soja de 60kg - média de preço
    quantidade_saca_por_hectares = 60 // Quantidade de sacas que cada hectare gera em média - 50 a 80
    herbicida_litro = 120; // preço do herbicida por Litro - encontrado entre 110 a 130
    litro_hectares = 2.5 // quantidade de Litros por hectare médio para aplicação
    periodo_aplicacao = 56 // De quantos em quantos dias deve aplicar
    tempo_colheita = 120 // tempo de colheita - 90 à 120
    evaporacao_minima = 0.19; // menor taxa de evaporação baseada na umidade
    evaporacao_maxima = 0.9; // maior taxa de evaporação baseada na umidade

    preco_saca_hectare = valor_saca * quantidade_saca_por_hectares * hectares;

    preco_hectares_por_aplicacao = Number((herbicida_litro * litro_hectares * hectares).toFixed(2));

    quantidade_aplicacoes = tempo_colheita / periodo_aplicacao;

    preco_final_herbicida = Number((preco_hectares_por_aplicacao * quantidade_aplicacoes).toFixed(2));

    div_mensagem.innerHTML = `<p>Você pode perder até <span><b>R$${preco_saca_hectare}</b></span> se não tiver um sistema de monitoramento cuidando do seu espaço!<br>
    Além disso, pode economizar de <span><b>R$${(preco_final_herbicida * evaporacao_minima).toFixed(2)}</b></span> até <span><b>R$${(preco_final_herbicida * evaporacao_maxima).toFixed(2)}</b></span></p>`
}