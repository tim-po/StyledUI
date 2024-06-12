import { CssFrom, GlobalValues, UnitValue } from '../../../TypedCss'
import { css } from 'styled-components'
import { CssProcessor } from '../../../types'

export type FlexCssProps = {
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | GlobalValues
  flexWrap?: 'wrap' | 'nowrap' | GlobalValues
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | GlobalValues
  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch'
    | GlobalValues
  gap?: UnitValue
}

export const flexCssProcessor: CssProcessor<FlexCssProps> = (props: FlexCssProps) => {
  return css`
    ${props.flexDirection ? css`display: flex;` : ''}
    ${props.flexDirection ? css`flex-direction: ${props.flexDirection};` : ''}

    ${props.flexWrap ? css`flex-wrap: ${props.flexWrap};` : ''}

    ${props.justifyContent ? css`justify-content: ${props.justifyContent};` : ''}
    ${props.alignItems ? css`align-items: ${props.alignItems};` : ''}

    ${props.gap ? css`gap: ${CssFrom(props.gap)};` : ''}
  `
}
