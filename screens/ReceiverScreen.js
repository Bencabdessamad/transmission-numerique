import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ChartDisplay from '../components/ChartDisplay';
import { 
  demodulateSignal,
  applyReceptionFilter,
  sampleSignal,
  makeDecision,
  recoverClock
} from '../utils/signalProcessing';

const ReceiverScreen = ({ navigation, route }) => {
  const { signal, binarySequence, encodingType, modulationType } = route.params;
  const [demodulatedSignal, setDemodulatedSignal] = useState([]);
  const [filteredSignal, setFilteredSignal] = useState([]);
  const [sampledSignal, setSampledSignal] = useState([]);
  const [receivedSequence, setReceivedSequence] = useState('');
  const [clock, setClock] = useState({ period: 1, phase: 0 });

  useEffect(() => {
    if (signal && signal.length > 0) {
      const demodulated = demodulateSignal(signal, modulationType);
      setDemodulatedSignal(demodulated);
      
      const filtered = applyReceptionFilter(demodulated);
      setFilteredSignal(filtered);
      
      const recoveredClock = recoverClock(filtered, encodingType);
      setClock(recoveredClock);
      
      const sampled = sampleSignal(filtered, recoveredClock);
      setSampledSignal(sampled);
      
      const decoded = makeDecision(sampled);
      setReceivedSequence(decoded);
    }
  }, [signal, modulationType, encodingType]);

  const calculateErrorRate = () => {
    if (!receivedSequence || receivedSequence.length !== binarySequence.length) return 0;
    let errors = 0;
    for (let i = 0; i < binarySequence.length; i++) {
      if (binarySequence[i] !== receivedSequence[i]) errors++;
    }
    return (errors / binarySequence.length) * 100;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Récepteur</Text>

      {signal.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Signal reçu</Text>
          <ChartDisplay data={signal} />

          <Text style={styles.sectionTitle}>Signal démodulé ({modulationType.toUpperCase()})</Text>
          <ChartDisplay data={demodulatedSignal} />

          <Text style={styles.sectionTitle}>Signal filtré</Text>
          <ChartDisplay data={filteredSignal} />

          <Text style={styles.sectionTitle}>Signal échantillonné</Text>
          <Text>Période d'horloge: {clock.period.toFixed(2)}, Phase: {clock.phase.toFixed(2)}</Text>
          <ChartDisplay data={sampledSignal} />

          <Text style={styles.sectionTitle}>Résultats</Text>
          <Text>Original: {binarySequence}</Text>
          <Text>Reçu:    {receivedSequence}</Text>
          <Text>Taux d'erreur: {calculateErrorRate().toFixed(2)}%</Text>

          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Results', { 
              originalSequence: binarySequence,
              receivedSequence,
              errorRate: calculateErrorRate()
            })}
            style={styles.button}
          >
            Voir les résultats détaillés
          </Button>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default ReceiverScreen;