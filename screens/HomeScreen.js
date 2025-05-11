import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradientBackground}
      />
      
      <View style={styles.contentContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.titleContainer}>
              <Ionicons name="radio-outline" size={28} color={theme.colors.primary} />
              <Title style={styles.title}>Simulation de transmission numérique</Title>
            </View>
            <Paragraph style={styles.paragraph}>
              Cette application simule une chaîne complète de transmission numérique,
              de l'émetteur au récepteur, en passant par le canal avec bruit.
            </Paragraph>
          </Card.Content>
        </Card>

        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Emitter')}
          style={styles.primaryButton}
          labelStyle={styles.buttonLabel}
          icon="play-circle"
        >
          Commencer la simulation
        </Button>

        <Button 
          mode="outlined" 
          onPress={() => navigation.navigate('Results')}
          style={styles.secondaryButton}
          labelStyle={styles.secondaryButtonLabel}
          icon="eye"
        >
          Voir un exemple
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 90,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    lineHeight: 20,
    opacity: 0.8,
    marginTop: 4,
  },
  primaryButton: {
    marginVertical: 10,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  secondaryButton: {
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: 0.5,
    paddingVertical: 2,
  },
  secondaryButtonLabel: {
    fontSize: 20,
    letterSpacing: 0.5,
    paddingVertical: 2,
  }
});

export default HomeScreen;