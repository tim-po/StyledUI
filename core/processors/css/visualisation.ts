import { CssFrom, UnitValue } from '../../../TypedCss'
import { css } from 'styled-components'
import { CssProcessor } from '../../../types'

type BorderStyle = 'none' | 'dotted' | 'inset' | 'dashed' | 'solid'

export function CreateBoxShadow(
  color: string,
  offsetX?: UnitValue,
  offsetY?: UnitValue,
  blur?: UnitValue,
  spread?: UnitValue,
) {
  return `${CssFrom(offsetX || 0)} ${CssFrom(offsetY || 0)} ${CssFrom(
    blur || 0,
  )} ${CssFrom(spread || 0)} ${color};
  `
}

export type VisualisationCssProps = {
  borderRadius?: UnitValue

  border?: string
  borderTop?: string
  borderBottom?: string
  borderLeft?: string
  borderRight?: string

  borderStyle?: BorderStyle
  borderBottomStyle?: BorderStyle
  borderLeftStyle?: BorderStyle
  borderRightStyle?: BorderStyle
  borderTopStyle?: BorderStyle

  borderColor?: string
  borderTopColor?: string
  borderBottomColor?: string
  borderLeftColor?: string
  borderRightColor?: string

  borderWidth?: UnitValue
  borderTopWidth?: UnitValue
  borderBottomWidth?: UnitValue
  borderLeftWidth?: UnitValue
  borderRightWidth?: UnitValue

  opacity?: number
  background?: string
  boxShadow?: string
  backdropFilter?: string
}

export const visualisationCssProcessor: CssProcessor<VisualisationCssProps> = (
  props: VisualisationCssProps,
) => {
  return css`
    ${props.border ? css`border: ${props.border};` : ''}
    ${props.borderTop ? css`border-top: ${props.borderTop};` : ''}
    ${props.borderBottom ? css`border-bottom: ${props.borderBottom};` : ''}
    ${props.borderLeft ? css`border-left: ${props.borderLeft};` : ''}
    ${props.borderRight ? css`border-right: ${props.borderRight};` : ''}

    ${props.borderStyle ? css`border-style: ${props.borderStyle};` : ''}
    ${
      props.borderBottomStyle ? css`border-bottom-style: ${props.borderBottomStyle};` : ''
    }
    ${props.borderLeftStyle ? css`border-left-style: ${props.borderLeftStyle};` : ''}
    ${props.borderRightStyle ? css`border-right-style: ${props.borderRightStyle};` : ''}
    ${props.borderTopStyle ? css`border-top-style: ${props.borderTopStyle};` : ''}

    ${props.borderColor ? css`border-color: ${props.borderColor};` : ''}
    ${props.borderTopColor ? css`border-top-color: ${props.borderTopColor};` : ''}
    ${
      props.borderBottomColor ? css`border-bottom-color: ${props.borderBottomColor};` : ''
    }
    ${props.borderLeftColor ? css`border-left-color: ${props.borderLeftColor};` : ''}
    ${props.borderRightColor ? css`border-right-color: ${props.borderRightColor};` : ''}

    ${
      props.borderWidth !== undefined
        ? css`border-width: ${CssFrom(props.borderWidth)};`
        : ''
    }
    ${
      props.borderTopWidth !== undefined
        ? css`border-top-width: ${CssFrom(props.borderTopWidth)};`
        : ''
    }
    ${
      props.borderBottomWidth !== undefined
        ? css`border-bottom-width: ${CssFrom(props.borderBottomWidth)};`
        : ''
    }
    ${
      props.borderLeftWidth !== undefined
        ? css`border-left-width: ${CssFrom(props.borderLeftWidth)};`
        : ''
    }
    ${
      props.borderRightWidth !== undefined
        ? css`border-right-width: ${CssFrom(props.borderRightWidth)};`
        : ''
    }

    ${props.background ? css`background: ${props.background};` : ''}
    ${props.boxShadow ? css`box-shadow: ${props.boxShadow};` : ''}
    ${props.opacity !== undefined ? css`opacity: ${props.opacity};` : ''}
    ${
      props.borderRadius !== undefined
        ? css`border-radius: ${CssFrom(props.borderRadius)};`
        : ''
    }
    ${props.backdropFilter ? css`backdrop-filter: ${props.backdropFilter};` : ''}
  `
}
