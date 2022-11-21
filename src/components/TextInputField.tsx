import React, { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Gutter, Layout } from '../style/settings';

interface Props {
  onChangeText: (value: string) => void;
  text?: string;
  placeholder: string;
}

export const TextInputField: FC<Props> = ({
  onChangeText,
  text,
  placeholder
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    onChangeText={onChangeText}
    value={text}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: Layout.BORDER_WIDTH,
    borderRadius: Layout.BORDER_RADIUS,
    paddingVertical: Gutter.REGULAR,
    paddingHorizontal: Gutter.REGULAR,
    marginVertical: Gutter.REGULAR
  }
});
