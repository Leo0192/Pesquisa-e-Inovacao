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

    div_mensagem.innerHTML = `<p>Você pode perder até <span><b style="color: red">R$${(preco_saca_hectare).toFixed(2)}</b></span> se não tiver um sistema de monitoramento cuidando do seu espaço!
   <br> <br> Isso ocorre devido a perda da plantação por conta de: <b style="color: red">fungos</b>, <b style="color: red">seca inesperada</b> e <b style="color: red">má absorção de nutrientes do solo</b>; cujo os mesmos podem ser evitados com o nosso sistema. <br>
   <br> Além disso, pode economizar de <span><b style="color: red">R$${(preco_final_herbicida * evaporacao_minima).toFixed(2)}</b></span> até <span><b style="color: red">R$${(preco_final_herbicida * evaporacao_maxima).toFixed(2)}</b>
   por conta de um uso mais eficiênte de: <b style="color: red">pesticidas</b>, <b style="color: red">água</b> e <b style="color: red">herbicidas</b></span></p>`
}