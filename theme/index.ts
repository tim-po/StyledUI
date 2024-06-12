export const defaultColors = {
  dark: {
    primary: 'rgb(10,132,255)',
    text: 'rgb(255,255,255)',
    border: 'rgb(235,235,235)',
    fill: 'rgb(106,106,106)',
  },
  light: {
    primary: 'rgb(0,122,255)',
    text: 'rgb(18,18,18)',
    border: 'rgb(168,168,168)',
    fill: 'rgb(207,207,207)',
  },
}

export type FastThemeType = {
  colors: Record<'dark' | 'light', Record<'primary', string>>
}

export const FastUIDefaultTheme = {
  colors: defaultColors,
}
