import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';

// Add near the top of your App.js
LogBox.ignoreLogs([
  'Animated: `useNativeDriver`',
]);


// Import screens with correct paths
import HomeScreen from './screens/HomeScreen';
import EmitterScreen from './screens/EmitterScreen';
import ChannelScreen from './screens/ChannelScreen';
import ReceiverScreen from './screens/ReceiverScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4c669f',
            },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Emitter" component={EmitterScreen} />
          <Stack.Screen name="Channel" component={ChannelScreen} />
          <Stack.Screen name="Receiver" component={ReceiverScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;