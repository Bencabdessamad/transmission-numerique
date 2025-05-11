// components/ChartDisplay.web.js
import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ChartDisplay = ({ data, title, width = Dimensions.get('window').width - 40 }) => {
  if (!data || data.length === 0) return null;

  return (
    <View style={{ marginVertical: 10 }}>
      <LineChart
        data={{
          labels: Array.from({ length: data.length }, (_, i) => ''),
          datasets: [{ data }]
        }}
        width={width}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 100, 200, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { 
            r: '3', 
            strokeWidth: '2', 
            stroke: '#0064c8',
            // Add these to suppress web warnings
            onStartShouldSetResponder: undefined,
            onResponderGrant: undefined,
            onResponderMove: undefined,
            onResponderRelease: undefined,
            onResponderTerminate: undefined,
            onResponderTerminationRequest: undefined
          }
        }}
        bezier
        style={{ borderRadius: 8 }}
        withHorizontalLabels={false}
        withVerticalLabels={false}
      />
    </View>
  );
};

export default ChartDisplay;