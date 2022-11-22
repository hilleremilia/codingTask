import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { Document } from '../types/documents';
import { Gutter } from '../style/settings';
import { ListItem } from './ListItem';
import { FC } from 'react';

interface Props {
  documents?: Document[];
}

export const List: FC<Props> = ({ documents }) => {
  const renderListItem: ListRenderItem<Document> = ({ item, index }) => (
    <ListItem
      document={item}
      showBottomBorder={index + 1 !== documents?.length}
      key={item.title}
    />
  );

  return (
    <>
      {!documents?.length ? (
        <View style={styles.container}>
          <Text>There are no documents found.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={documents}
          renderItem={renderListItem}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    paddingBottom: Gutter.OUTER
  }
});
