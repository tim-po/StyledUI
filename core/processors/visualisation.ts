import { css } from 'styled-components'
import { VisualisationCssProps } from './css/visualisation'
import { CssFrom, UnitValue } from '../../TypedCss'
import { CssProcessor, Processor } from '../../types'
import { getSize, SizeModifier, StandardSizes } from './extensions/size'
import { getOrientation, Orientations } from './extensions/orientation'
import { getColorScheme } from './higherOrder/colorScheme'
import { AllCssProps } from '../index'
import {
  getThickness,
  materialFragments,
  MaterialPart,
  ThicknessProps,
} from './extensions/material'

type Side = 'top' | 'left' | 'right' | 'bottom'

function CssFromRadius(radius: UnitValue, sides?: boolean | Side | Side[]) {
  const cssFromRadius = CssFrom(radius)
  if (!sides) {
    if (radius) {
      return `${cssFromRadius}`
    }
    return undefined
  }
  if (sides === true) {
    return `${cssFromRadius}`
  }

  const cssUnits = ['0', '0', '0', '0']

  switch (Array.isArray(sides) ? sides.join('-') : sides) {
    case 'top':
      cssUnits[0] = cssFromRadius
      cssUnits[1] = cssFromRadius
      break
    case 'right':
      cssUnits[1] = cssFromRadius
      cssUnits[2] = cssFromRadius
      break
    case 'bottom':
      cssUnits[2] = cssFromRadius
      cssUnits[3] = cssFromRadius
      break
    case 'left':
      cssUnits[3] = cssFromRadius
      cssUnits[0] = cssFromRadius
      break
    case 'top-left':
      cssUnits[0] = cssFromRadius
      break
    case 'top-right':
      cssUnits[1] = cssFromRadius
      break
    case 'bottom-right':
      cssUnits[2] = cssFromRadius
      break
    case 'bottom-left':
      cssUnits[3] = cssFromRadius
      break
    default:
      break
  }

  return cssUnits.join(' ')
}

type Thickness = 'thick' | 'regular' | 'thin' | 'ultraThin'

const borderThicknesses: Record<Thickness, number> = {
  thick: 8,
  regular: 4,
  thin: 2,
  ultraThin: 1,
}

type MaterialProps = ThicknessProps & {
  materialPart?: MaterialPart
  opacity?: number
}

export type VisualisationProps = {
  rounded?: boolean | Side | Side[]

  border?: number | string | Thickness
  borderColor?: string
  borderSides?: Side | Side[]

  blurBg?: boolean | number
  transparent?: boolean

  clickable?: boolean
  flush?: boolean
} & Pick<VisualisationCssProps, 'borderRadius' | 'opacity' | 'background' | 'boxShadow'> &
  MaterialProps &
  Orientations &
  StandardSizes

export const materialProcessor: CssProcessor<MaterialProps> = (props: MaterialProps) => {
  const thickness = getThickness(props)
  const materialFragmentsForColorScheme = getColorScheme(materialFragments)
  if (!materialFragmentsForColorScheme) {
    return css`
    `
  }

  if (props.materialPart === 'separator') {
    return css`
      ${materialFragmentsForColorScheme.separator()}
    `
  }

  if (props.materialPart === 'fill') {
    return css`
      ${materialFragmentsForColorScheme.fill(props.opacity || 1)}
    `
  }

  if (!thickness) {
    return css``
  }

  return css`
    ${materialFragmentsForColorScheme.background(thickness)}
    ${materialFragmentsForColorScheme.font()}
  `
}

export const visualisationProcessor: Processor<VisualisationProps> = (
  props: VisualisationProps,
) => {
  const { borderRadius, opacity, background, boxShadow } = props
  const newProps: AllCssProps = { borderRadius, opacity, background, boxShadow }

  const size = getSize(props)
  const aspectRatio = getOrientation(props)
  const roundness: Record<SizeModifier, number> = {
    tiny: 4,
    small: 8,
    medium: 10,
    big: aspectRatio === 'center' ? 16 : 12,
    huge: aspectRatio === 'center' ? 20 : 16,
  }

  if (size) {
    newProps.borderRadius = CssFromRadius(roundness[size], props.rounded)
  }
  if (borderRadius) {
    newProps.borderRadius = CssFromRadius(borderRadius, props.rounded)
  }
  if (props.flush) {
    newProps.borderRadius = 0
  }

  newProps.fragments = [
    css`
      ${
        props.clickable &&
        css`
            cursor: pointer;
            outline: none !important;
            border: none;
          `
      }

      ${materialProcessor(props)}
    `,
  ]

  const allThickness: Array<Thickness> = ['thick', 'regular', 'thin', 'ultraThin']

  if (props.border) {
    if (typeof props.border === 'number') {
      newProps.borderWidth = props.border
    } else if (allThickness.includes(props.border as Thickness)) {
      newProps.borderWidth = borderThicknesses[props.border as Thickness]
    } else {
      newProps.border = props.border
    }
    newProps.borderColor = props.borderColor || 'rgba(0,0,0,0.2)'
    newProps.borderStyle = 'solid'

    if (props.borderSides) {
      if (props.borderSides.includes('top')) {
        newProps.borderTop = newProps.border
        newProps.borderTopStyle = newProps.borderStyle
        newProps.borderTopColor = newProps.borderColor
        newProps.borderTopWidth = newProps.borderWidth
      }
      if (props.borderSides.includes('right')) {
        newProps.borderRight = newProps.border
        newProps.borderRightStyle = newProps.borderStyle
        newProps.borderRightColor = newProps.borderColor
        newProps.borderRightWidth = newProps.borderWidth
      }
      if (props.borderSides.includes('bottom')) {
        newProps.borderBottom = newProps.border
        newProps.borderBottomStyle = newProps.borderStyle
        newProps.borderBottomColor = newProps.borderColor
        newProps.borderBottomWidth = newProps.borderWidth
      }
      if (props.borderSides.includes('left')) {
        newProps.borderLeft = newProps.border
        newProps.borderLeftStyle = newProps.borderStyle
        newProps.borderLeftColor = newProps.borderColor
        newProps.borderLeftWidth = newProps.borderWidth
      }
      newProps.border = undefined
      newProps.borderStyle = undefined
      newProps.borderWidth = undefined
      newProps.borderColor = undefined
    }
  }

  if (props.blurBg) {
    newProps.backdropFilter = `blur(${props.blurBg}px)`
  }

  if (props.transparent) {
    newProps.opacity = 0
  }

  return newProps
}
