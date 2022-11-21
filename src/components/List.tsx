import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Gutter, typography } from '../style/settings';
import { useFetchData } from '../hooks/useFetchData';
import { Document } from '../types/documents';
import { ListItem } from './ListItem';

const URL = 'http://localhost:3000/documents';

export const List = () => {
  const { loading, error, data } = useFetchData<Document[]>(URL);

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

  const renderListItem: ListRenderItem<Document> = ({ item, index }) => (
    <ListItem
      document={item}
      showBottomBorder={index + 1 !== data?.length}
      key={item.title}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Documents</Text>

      <FlatList data={data} renderItem={renderListItem} />
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
