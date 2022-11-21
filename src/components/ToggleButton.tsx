import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color, Gutter, Layout } from '../style/settings';

interface Props<T> {
  title: string;
  isActive?: boolean;
  id: T;
  onPress: (id: T) => void;
}

export const ToggleButton = <T extends unknown>({
  isActive = false,
  title,
  id,
  onPress
}: Props<T>) => {
  const onButtonPress = () => onPress(id);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, isActive ? styles.activeButton : []]}
      onPress={onButtonPress}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: Layout.BORDER_WIDTH,
    padding: Gutter.REGULAR,
    marginVertical: Gutter.REGULAR,
    borderRadius: Layout.BORDER_RADIUS,
    marginRight: Gutter.REGULAR
  },
  activeButton: {
    backgroundColor: Color.PRIMARY
  }
});
