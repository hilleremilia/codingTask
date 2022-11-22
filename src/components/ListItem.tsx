import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Document } from '../types/documents';
import { Color, Gutter, Layout, typography } from '../style/settings';
import moment from 'moment';

interface Props {
  showBottomBorder: boolean;
  document: Document;
}

const DATE_FORMAT = 'DD.MM.YYYY';

export const ListItem: FC<Props> = ({
  showBottomBorder,
  document: { title, publication_date, priority, origin, tags }
}) => {
  const renderTags = () =>
    tags?.map((tag, index) => (
      <Text key={tag}>
        {tag}
        {index + 1 !== tags.length ? ', ' : ''}
      </Text>
    ));

  return (
    <View
      style={[styles.container, showBottomBorder ? styles.borderBottom : []]}
    >
      <Text style={styles.title}>{title}</Text>

      <Text>{`Priority: ${priority}`}</Text>

      {!!publication_date && (
        <Text>{`Published at: ${moment(publication_date).format(
          DATE_FORMAT
        )}`}</Text>
      )}

      {!!origin && <Text>{`Origin: ${origin}`}</Text>}

      <View style={styles.tags}>{!!tags && renderTags()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Gutter.REGULAR
  },
  tags: {
    flexDirection: 'row'
  },
  title: {
    ...typography.h3
  },
  borderBottom: {
    borderBottomWidth: Layout.BORDER_WIDTH,
    borderBottomColor: Color.PRIMARY
  }
});
