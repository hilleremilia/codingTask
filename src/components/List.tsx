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
import { keys, SortDirection, useSort } from '../hooks/useSort';
import { useState } from 'react';
import { ToggleButton } from './ToggleButton';
import { useFilter } from '../hooks/useFilter';
import { TextInputField } from './TextInputField';

const URL = 'http://localhost:3000/documents';

export const List = () => {
  const [sortKey, setSortKey] = useState('origin');
  const [filterValue, setFilterValue] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  const { loading, error, data } = useFetchData<Document[]>(URL);
  const { sortedData } = useSort(sortDirection, sortKey, data);
  const { filteredData } = useFilter(filterValue, sortedData);

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

  const renderKeys = () =>
    keys.map((key) => (
      <ToggleButton
        title={key}
        key={key}
        isActive={sortKey === key}
        id={key}
        onPress={onSortKeyPress}
      />
    ));

  const onSortDirectionPress = (id: SortDirection) => {
    setSortDirection(id);
  };

  const onSortKeyPress = (id: string) => {
    setSortKey(id);
  };

  const onInputValueChange = (value: string) => {
    setFilterValue(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Documents</Text>

      <TextInputField
        onChangeText={onInputValueChange}
        placeholder="Find by title"
      />

      <Text style={styles.sectionHeader}>Sort</Text>

      <View style={styles.buttonContainer}>
        <ToggleButton
          title="Ascending"
          isActive={sortDirection === SortDirection.ASC}
          id={SortDirection.ASC}
          onPress={onSortDirectionPress}
        />
        <ToggleButton
          title="Descending"
          isActive={sortDirection === SortDirection.DESC}
          id={SortDirection.DESC}
          onPress={onSortDirectionPress}
        />
      </View>

      <View style={styles.buttonContainer}>{renderKeys()}</View>

      {!filteredData?.length ? (
        <View style={[styles.container, styles.error]}>
          <Text>There are no documents found.</Text>
        </View>
      ) : (
        <FlatList data={filteredData} renderItem={renderListItem} />
      )}
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
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
