import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Gutter, typography } from '../style/settings';
import { useFetchData } from '../hooks/useFetchData';
import { Document } from '../types/documents';
import { ListItem } from './ListItem';
import { SortDirection, SortKeys, useSort } from '../hooks/useSort';
import { ToggleButton } from './ToggleButton';
import { useFilter } from '../hooks/useFilter';
import { TextInputField } from './TextInputField';
import { useTagNames } from '../hooks/useTagNames';
import { useTags } from '../hooks/useTags';
import { useMemo } from 'react';

const URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/documents'
    : 'http://localhost:3000/documents';

const keys = [SortKeys.ORIGIN, SortKeys.PRIORITY];

export const List = () => {
  const { loading, error, data } = useFetchData<Document[]>(URL);
  const { tagNames } = useTagNames(data);
  const { sortedData, setSortDirection, sortDirection, sortKey, setSortKey } =
    useSort(data);
  const { filteredData, setFilterValue } = useFilter(sortedData);
  const { selectedData, manageTags, checkTagExists, tags } =
    useTags(filteredData);

  const renderTags = useMemo(
    () =>
      tagNames.map((key) => (
        <ToggleButton
          title={key}
          key={key}
          isActive={tags && checkTagExists(key, tags)}
          id={key}
          onPress={onTagPress}
        />
      )),
    [tagNames]
  );

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

  const renderSortKeys = () =>
    keys.map((key) => (
      <ToggleButton
        title={key}
        key={key}
        isActive={sortKey === key}
        id={key}
        onPress={onSortKeyPress}
      />
    ));

  const onTagPress = (tag: string) => {
    manageTags(tag);
  };

  const onSortDirectionPress = (id: SortDirection) => {
    setSortDirection(id);
  };

  const onSortKeyPress = (id: SortKeys) => {
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

      <View style={styles.buttonContainer}>{renderSortKeys()}</View>

      <Text style={styles.sectionHeader}>Select tags</Text>
      <View style={styles.buttonContainer}>{renderTags}</View>

      {!selectedData?.length ? (
        <View style={[styles.container, styles.error]}>
          <Text>There are no documents found.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={selectedData}
          renderItem={renderListItem}
        />
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
  },
  list: {
    paddingBottom: Gutter.OUTER
  }
});
