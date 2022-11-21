import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { List } from './src/components/List';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <List />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
