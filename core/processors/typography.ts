import { FontCssProps } from './css/font'
import { getSize, SizeModifier, StandardSizes } from './extensions/size'
import { getElement, TypographyElements } from './extensions/typography'
import { AllCssProps } from '../index'

const fontSizes: Record<SizeModifier, number> = {
  tiny: 12,
  small: 16,
  medium: 18,
  big: 20,
  huge: 24,
}

export type TextProps = {
  bold?: boolean
  bolder?: boolean
  lighter?: boolean
  light?: boolean
} & Pick<FontCssProps, 'fontSize' | 'fontWeight' | 'color' | 'textAlign'> &
  StandardSizes &
  TypographyElements

export const typographyProcessor = (props: TextProps) => {
  const { fontSize, fontWeight, color, textAlign } = props
  const newFontConfig: AllCssProps = { fontSize, fontWeight, color, textAlign }
  const size = getSize(props)

  if (size) {
    newFontConfig.fontSize = fontSizes[size]
  } else if (!props.fontSize) {
    newFontConfig.fontSize = 12
  }

  if (props.fontSize) {
    newFontConfig.fontSize = props.fontSize
  } else if (typeof newFontConfig.fontSize === 'number') {
    const element = getElement(props)
    switch (element) {
      case 'h1':
        newFontConfig.fontSize += 8
        break
      case 'h2':
        newFontConfig.fontSize += 6
        break
      case 'h3':
        newFontConfig.fontSize += 4
        break
      case 'h4':
        newFontConfig.fontSize += 2
        break
      case 'body':
        break
      case 'label':
        newFontConfig.fontSize = 18 + (newFontConfig.fontSize - 18) * 2
        break
    }
  }

  if (props.bold) {
    newFontConfig.fontWeight = 'bold'
  }
  if (props.bold) {
    newFontConfig.fontWeight = 'bolder'
  }
  if (props.light) {
    newFontConfig.fontWeight = 'lighter'
  }
  if (props.lighter) {
    newFontConfig.fontWeight = 'lighter'
  }

  return newFontConfig
}
