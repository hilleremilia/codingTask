import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Documents } from './src/components/Documents';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Documents />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
