import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import ChartDisplay from '../components/ChartDisplay';
import { addNoise } from '../utils/signalProcessing';
import debounce from 'lodash.debounce';

const ChannelScreen = ({ navigation, route }) => {
  const { signal, binarySequence, encodingType, modulationType } = route.params;
  const [noiseLevel, setNoiseLevel] = useState(0.2);
  const [noisySignal, setNoisySignal] = useState([]);

  // Debounced state setter to prevent too many updates
  const debouncedSetNoiseLevel = useCallback(
    debounce((value) => {
      setNoiseLevel(value);
    }, 200),
    [] // ensures debounce is not recreated on every render
  );

  useEffect(() => {
    if (signal && signal.length > 0) {
      const noisy = addNoise(signal, noiseLevel);
      setNoisySignal(noisy);
    }
  }, [signal, noiseLevel]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Canal de transmission</Text>

      <Text style={styles.label}>Niveau de bruit: {noiseLevel.toFixed(2)}</Text>
      <Slider
        value={noiseLevel}
        onValueChange={debouncedSetNoiseLevel}
        minimumValue={0}
        maximumValue={1}
        step={0.05}
        style={styles.slider}
      />

      {signal.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Signal original</Text>
          <ChartDisplay data={signal} />

          <Text style={styles.sectionTitle}>Signal avec bruit</Text>
          <ChartDisplay data={noisySignal} />

          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Receiver', { 
              signal: noisySignal,
              binarySequence,
              encodingType,
              modulationType
            })}
            style={styles.button}
          >
            Transmettre au récepteur
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
  label: {
    marginTop: 10,
  },
  slider: {
    width: '100%',
    marginVertical: 10,
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

export default ChannelScreen;
