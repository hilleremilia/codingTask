import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Gutter, typography } from '../style/settings';
import { useFetchData } from '../hooks/useFetchData';

const URL = 'http://localhost:3000/documents';

export const List = () => {
  const { loading, error, data } = useFetchData(URL);

  if (loading) {
    return <ActivityIndicator style={styles.container} />;
  }

  if (error) {
    return (
      <View style={[styles.container, styles.error]}>
        <Text>Sorry, there has been an error when fetching data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Documents</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Gutter.OUTER
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    ...typography.h1
  },
  sectionHeader: {
    ...typography.h2
  }
});
