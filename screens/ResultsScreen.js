import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';

const ResultsScreen = ({ navigation, route }) => {
  const { originalSequence, receivedSequence, errorRate } = route.params || {
    originalSequence: '10110010',
    receivedSequence: '10110011',
    errorRate: 12.5
  };

  const compareSequences = () => {
    return originalSequence.split('').map((bit, index) => (
      <Text key={index} style={bit === receivedSequence[index] ? styles.correctBit : styles.errorBit}>
        {bit}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Résultats de la transmission</Title>
          
          <Paragraph style={styles.section}>
            <Text style={styles.label}>Séquence originale: </Text>
            <Text style={styles.sequence}>{originalSequence}</Text>
          </Paragraph>
          
          <Paragraph style={styles.section}>
            <Text style={styles.label}>Séquence reçue:    </Text>
            <Text style={styles.sequence}>{receivedSequence}</Text>
          </Paragraph>
          
          <Paragraph style={styles.section}>
            <Text style={styles.label}>Comparaison:       </Text>
            <View style={styles.comparison}>{compareSequences()}</View>
          </Paragraph>
          
          <Paragraph style={styles.section}>
            <Text style={styles.label}>Taux d'erreur: </Text>
            <Text style={errorRate > 0 ? styles.errorRate : styles.correctRate}>
              {errorRate.toFixed(2)}%
            </Text>
          </Paragraph>
        </Card.Content>
      </Card>

      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('Emitter')}
        style={styles.button}
      >
        Nouvelle simulation
      </Button>

      <Button 
        mode="outlined" 
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      >
        Retour à l'accueil
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    width: 150,
  },
  sequence: {
    fontFamily: 'monospace',
    fontSize: 16,
  },
  comparison: {
    flexDirection: 'row',
  },
  correctBit: {
    color: 'green',
    fontFamily: 'monospace',
    fontSize: 16,
  },
  errorBit: {
    color: 'red',
    fontFamily: 'monospace',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  correctRate: {
    color: 'green',
    fontWeight: 'bold',
  },
  errorRate: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ResultsScreen;