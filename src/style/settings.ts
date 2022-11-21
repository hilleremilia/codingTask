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

const header = {
  fontWeight: '700' as TextStyle['fontWeight'],
  paddingVertical: Gutter.REGULAR
};

export const typography = {
  h1: {
    ...header,
    fontSize: 24
  },
  h2: {
    ...header,
    fontSize: 20
  },
  h3: {
    ...header,
    fontSize: 18
  }
};
