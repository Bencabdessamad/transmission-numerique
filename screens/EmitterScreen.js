import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import ParameterSelector from '../components/ParameterSelector';
import ChartDisplay from '../components/ChartDisplay';
import { encodeLine, applyEmissionFilter, modulateSignal } from '../utils/signalProcessing';

const EmitterScreen = ({ navigation, route }) => {
  const [binarySequence, setBinarySequence] = useState('10110010');
  const [encodingType, setEncodingType] = useState('nrz');
  const [modulationType, setModulationType] = useState('ask');
  const [encodedSignal, setEncodedSignal] = useState([]);
  const [filteredSignal, setFilteredSignal] = useState([]);
  const [modulatedSignal, setModulatedSignal] = useState([]);

  const encodingOptions = [
    { label: 'NRZ (Non-Return-to-Zero)', value: 'nrz' },
    { label: 'RZ (Return-to-Zero)', value: 'rz' },
    { label: 'Manchester', value: 'manchester' },
  ];

  const modulationOptions = [
    { label: 'ASK (Amplitude Shift Keying)', value: 'ask' },
    { label: 'FSK (Frequency Shift Keying)', value: 'fsk' },
    { label: 'PSK (Phase Shift Keying)', value: 'psk' },
  ];

  const processSignals = () => {
    const encoded = encodeLine(binarySequence, encodingType);
    setEncodedSignal(encoded);
    
    const filtered = applyEmissionFilter(encoded);
    setFilteredSignal(filtered);
    
    const modulated = modulateSignal(filtered, modulationType);
    setModulatedSignal(modulated);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View>
        <Text style={styles.title}>Configuration de l'émetteur</Text>
  
        <TextInput
          label="Séquence binaire"
          value={binarySequence}
          onChangeText={setBinarySequence}
          style={styles.input}
          keyboardType="numeric"
        />
  
        <ParameterSelector
          title="Type de codage en ligne"
          options={encodingOptions}
          selectedValue={encodingType}
          onValueChange={setEncodingType}
        />
  
        <ParameterSelector
          title="Type de modulation"
          options={modulationOptions}
          selectedValue={modulationType}
          onValueChange={setModulationType}
        />
  
        <Button 
          mode="contained" 
          onPress={processSignals}
          style={styles.button}
        >
          Traiter le signal
        </Button>
  
        {encodedSignal.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Signal encodé ({encodingType.toUpperCase()})</Text>
            <ChartDisplay data={encodedSignal} />
  
            <Text style={styles.sectionTitle}>Signal filtré</Text>
            <ChartDisplay data={filteredSignal} />
  
            <Text style={styles.sectionTitle}>Signal modulé ({modulationType.toUpperCase()})</Text>
            <ChartDisplay data={modulatedSignal} />
  
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('Channel', { 
                signal: modulatedSignal,
                binarySequence,
                encodingType,
                modulationType
              })}
              style={styles.button}
            >
              Transmettre au canal
            </Button>
          </>
        )}
      </View>
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
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    marginVertical: 15,
  },
  scrollContainer: {
    paddingBottom: 30,
  },  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default EmitterScreen;