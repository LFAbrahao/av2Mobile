import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

// Array com os caminhos das imagens dos dados (1 a 6)
const faces = [
  require('./assets/dice1.png'),
  require('./assets/dice2.png'),
  require('./assets/dice3.png'),
  require('./assets/dice4.png'),
  require('./assets/dice5.png'),
  require('./assets/dice6.png'),
];

export default function App() {
  // Estados para os dados e para o placar
  const [dado1, setDado1] = useState(null);
  const [dado2, setDado2] = useState(null);
  const [placar, setPlacar] = useState({ jogador1: 0, jogador2: 0 });

  // Função para rolar os dados
  const rolarDados = () => {
    const novoDado1 = Math.floor(Math.random() * 6);
    const novoDado2 = Math.floor(Math.random() * 6);
    setDado1(novoDado1);
    setDado2(novoDado2);

    // Verificando quem venceu e atualizando o placar
    if (novoDado1 > novoDado2) {
      setPlacar((prevPlacar) => ({
        ...prevPlacar,
        jogador1: prevPlacar.jogador1 + 1,
      }));
    } else if (novoDado2 > novoDado1) {
      setPlacar((prevPlacar) => ({
        ...prevPlacar,
        jogador2: prevPlacar.jogador2 + 1,
      }));
    }
  };

  // Função para exibir quem venceu a rodada
  const resultado = () => {
    if (dado1 !== null && dado2 !== null) {
      if (dado1 > dado2) {
        return 'Jogador 1 venceu!';
      } else if (dado2 > dado1) {
        return 'Jogador 2 venceu!';
      } else {
        return 'Empate!';
      }
    }
    return 'Clique para rolar os dados';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Dados</Text>

      {/* Exibição dos dados */}
      <View style={styles.dadosContainer}>
        {/* Jogador 1 */}
        <View style={styles.dadoContainer}>
          <Text style={styles.jogadorLabel}>Jogador 1</Text>
          <Image style={styles.dado} source={dado1 !== null ? faces[dado1] : null} />
        </View>

        {/* Jogador 2 */}
        <View style={styles.dadoContainer}>
          <Text style={styles.jogadorLabel}>Jogador 2</Text>
          <Image style={styles.dado} source={dado2 !== null ? faces[dado2] : null} />
        </View>
      </View>

      {/* Botão para rolar os dados */}
      <Button title="Jogar Dados" onPress={rolarDados} />

      {/* Exibição do resultado da rodada */}
      <Text style={styles.resultado}>{resultado()}</Text>

      {/* Exibição do placar */}
      <View style={styles.placarContainer}>
        <Text style={styles.placar}>Jogador 1: {placar.jogador1}</Text>
        <Text style={styles.placar}>Jogador 2: {placar.jogador2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F9D58',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  dadosContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dadoContainer: {
    alignItems: 'center', // Para centralizar o texto em cima do dado
  },
  dado: {
    width: 100,
    height: 100,
    margin: 10,
  },
  jogadorLabel: {
    position: 'absolute', // Coloca o texto sobre o dado
    top: -20, // Distância entre o dado e o texto
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Cor do texto
  },
  resultado: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  placarContainer: {
    marginTop: 20,
  },
  placar: {
    fontSize: 20,
    marginVertical: 5,
  },
});
