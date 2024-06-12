import { CssFrom, MarginPaddingValue, WidthHeightValue } from '../../../TypedCss'
import { css } from 'styled-components'
import { CssProcessor } from '../../../types'

export type DimensionCssProps = {
  width?: WidthHeightValue
  maxWidth?: WidthHeightValue
  minWidth?: WidthHeightValue
  height?: WidthHeightValue
  maxHeight?: WidthHeightValue
  minHeight?: WidthHeightValue
  padding?: MarginPaddingValue
  grow?: number
  shrink?: number
}

export const dimensionCssProcessor: CssProcessor<DimensionCssProps> = (
  props: DimensionCssProps,
) => {
  return css`
    ${props.width !== undefined ? css`width: ${CssFrom(props.width)};` : ''}
    ${props.maxWidth !== undefined ? css`max-width: ${CssFrom(props.maxWidth)};` : ''}
    ${props.minWidth !== undefined ? css`min-width: ${CssFrom(props.minWidth)};` : ''}
    ${props.height !== undefined ? css`height: ${CssFrom(props.height)};` : ''}
    ${props.maxHeight !== undefined ? css`max-height: ${CssFrom(props.maxHeight)};` : ''}
    ${props.minHeight !== undefined ? css`min-height: ${CssFrom(props.minHeight)};` : ''}
    ${props.padding !== undefined ? css`padding: ${CssFrom(props.padding)};` : ''}
    ${props.grow !== undefined ? css`flex-grow: ${props.grow};` : ''}
    ${props.shrink !== undefined ? css`flex-shrink: ${props.shrink};` : ''}
  `
}
