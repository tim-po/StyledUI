import { css } from 'styled-components'
import { CssFrom, UnitValue } from '../../../TypedCss'
import { CssProcessor } from '../../../types'

export type FontCssProps = {
  fontSize?: UnitValue
  color?: string
  textAlign?: 'start' | 'center' | 'end' | 'justify'
  fontWeight?: number | 'bold' | 'bolder' | 'lighter' | 'normal'
  lineHeight?: UnitValue
  font?: string
}

export const fontCssProcessor: CssProcessor<FontCssProps> = (props: FontCssProps) => {
  return css`
    ${props.fontSize !== undefined ? css` font-size: ${CssFrom(props.fontSize)};` : ''}
    ${props.color ? css` color: ${props.color};` : ''}
    ${props.textAlign ? css` text-align: ${props.textAlign};` : ''}
    ${props.fontWeight ? css` font-weight: ${props.fontWeight};` : ''}
    ${
      props.lineHeight !== undefined
        ? css`line-height: ${CssFrom(props.lineHeight)};`
        : ''
    }
    ${props.font ? css` font: ${props.font};` : ''}
  `
}
