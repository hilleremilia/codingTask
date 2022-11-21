import { TextStyle } from 'react-native';

export enum Gutter {
  REGULAR = 8,
  FULL = 16,
  OUTER = 24
}

export enum Color {
  PRIMARY = '#82ead5'
}

export enum Layout {
  BORDER_WIDTH = 1,
  BORDER_RADIUS = 4
}

export const typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700' as TextStyle['fontWeight'],
    paddingVertical: Gutter.REGULAR
  },
  h2: {
    fontSize: 20,
    fontWeight: '700' as TextStyle['fontWeight'],
    paddingVertical: Gutter.REGULAR
  }
};
