import { css } from 'styled-components'
import { CssFrom, MarginPaddingValue, UnitValue } from '../../../TypedCss'

export type PositionCssProps = {
  overflow?: 'visible' | 'hidden' | 'auto' | 'scroll' | 'inherit'
  margin?: MarginPaddingValue
  position?: 'absolute' | 'fixed' | 'relative' | 'sticky' | 'static'
  zIndex?: number
  left?: UnitValue
  right?: UnitValue
  top?: UnitValue
  bottom?: UnitValue
}

export const positionCssProcessor = (props: PositionCssProps) => {
  return css`
    ${props.overflow ? css`overflow: ${props.overflow};` : ''}
    ${props.margin !== undefined ? css`margin: ${CssFrom(props.margin)};` : ''}
    ${props.position ? css`position: ${props.position};` : ''}

    ${props.left !== undefined ? css`left: ${CssFrom(props.left)};` : ''}
    ${props.right !== undefined ? css`right: ${CssFrom(props.right)};` : ''}
    ${props.top !== undefined ? css`top: ${CssFrom(props.top)};` : ''};
    ${props.bottom !== undefined ? css`bottom: ${CssFrom(props.bottom)};` : ''}

    ${props.zIndex ? css`z-index: ${props.zIndex};` : ''}
  `
}
