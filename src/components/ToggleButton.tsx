import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color, Gutter, Layout } from '../style/settings';

interface Props {
  title: string;
  isActive?: boolean;
}

export const ToggleButton: FC<Props> = ({ isActive = false, title }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={[styles.button, isActive ? styles.activeButton : []]}
  >
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderWidth: Layout.BORDER_WIDTH,
    padding: Gutter.REGULAR,
    marginVertical: Gutter.REGULAR,
    borderRadius: Layout.BORDER_RADIUS
  },
  activeButton: {
    backgroundColor: Color.PRIMARY
  }
});
