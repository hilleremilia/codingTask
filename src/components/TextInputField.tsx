import React, { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Gutter, Layout } from '../style/settings';

interface Props {
  onChangeText: () => void;
  text?: string;
}

export const TextInputField: FC<Props> = ({ onChangeText, text }) => (
  <TextInput
    style={styles.input}
    placeholder="Enter text"
    onChangeText={onChangeText}
    value={text}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: Layout.BORDER_WIDTH,
    borderRadius: Layout.BORDER_RADIUS,
    paddingVertical: Gutter.FULL,
    paddingHorizontal: Gutter.REGULAR,
    marginVertical: Gutter.REGULAR
  }
});
