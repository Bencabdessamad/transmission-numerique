import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';

const ParameterSelector = ({ 
  title, 
  options, 
  selectedValue, 
  onValueChange,
  customInput,
  onCustomInputChange
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      {options.map((option) => (
        <View key={option.value} style={styles.option}>
          <RadioButton
            value={option.value}
            status={selectedValue === option.value ? 'checked' : 'unchecked'}
            onPress={() => onValueChange(option.value)}
          />
          <Text>{option.label}</Text>
        </View>
      ))}
      
      {customInput && (
        <TextInput
          label="Séquence personnalisée"
          value={customInput}
          onChangeText={onCustomInputChange}
          style={styles.input}
          keyboardType="numeric"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  input: {
    marginTop: 10,
    backgroundColor: 'white',
  },
});

export default ParameterSelector;