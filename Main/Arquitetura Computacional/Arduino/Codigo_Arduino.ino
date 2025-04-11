#include "DHT.h" // Inclusão da biblioteca

#define TIPO_SENSOR DHT11 // Definição do tipo do sensor
const int PINO_SENSOR_DHT11 = A0; // Cria uma variável do tipo int que guarda o pino onde o sensor está conectado com o Arduino

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR); // Cria o objeto DHT (usando a biblioteca DHT)

void setup() {
  Serial.begin(9600); // Inicia a tela serial para visualização de dados e define em que frequência os resultados vão aparecer em bps (Serial)
  sensorDHT.begin(); // Inicia o sensor para realizar as leituras
}

void loop() {
  float umidade = sensorDHT.readHumidity(); // Cria a variável de umidade com o valor da umidade atual
  float umidade1 = umidade * 0.9;
  float umidade2 = umidade1 * 0.9;
  float umidade3 = umidade2 * 0.9;
  if (isnan(umidade)) { // Se não conseguir pegar os valores de temperatura ou umidade, ele exibe a mensagem abaixo
    Serial.println("Erro na leitura dos dados"); // Exibe uma mensagem indicando que houve erro de leitura
  } else { // Caso esteja recebendo os dados de temperatura e umidade
    Serial.print(umidade); // Imprime o valor da umidade
    Serial.print(';');
    Serial.print(umidade1);
    Serial.print(';');
    Serial.print(umidade2);
    Serial.print(';');
    Serial.println(umidade3);
  }
  delay(1000); // Adiciona um atraso de 1 segundo a cada resultado
}