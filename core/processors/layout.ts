import { getOrientation, Orientations } from './extensions/orientation'
import { FlexCssProps } from './css/flex'
import { PositionCssProps } from './css/position'
import { getSize, SizeModifier, StandardSizes } from './extensions/size'
import { MarginPaddingValue, WidthHeightValue } from '../../TypedCss'
import { AllCssProps } from '../index'
import { Processor } from '../../types'
import { HTMLAttributes } from 'react'
import { combined } from './higherOrder'
import { DimensionCssProps } from './css/dimensions'

const marginSizes: Record<SizeModifier, number> = {
  tiny: 4,
  small: 8,
  medium: 16,
  big: 24,
  huge: 40,
}

const paddingSizes: Record<SizeModifier, number> = {
  tiny: 4,
  small: 8,
  medium: 16,
  big: 24,
  huge: 40,
}

const gapSizes: Record<SizeModifier, number> = {
  tiny: 4,
  small: 12,
  medium: 20,
  big: 32,
  huge: 40,
}

type alignmentsHorizontal = 'left' | 'right'
type alignmentsVertical = 'top' | 'bottom'

type alignment =
  | `${alignmentsVertical}-${alignmentsHorizontal}`
  | `${alignmentsVertical | alignmentsHorizontal}`
  | alignmentsVertical
  | alignmentsHorizontal
  | 'center'

type flexAlignment =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'

type MarginPaddingProps = {
  margin?: MarginPaddingValue | SizeModifier | boolean
  padding?: MarginPaddingValue | SizeModifier | boolean
  flush?: boolean
  width?:
    | WidthHeightValue
    | { min?: WidthHeightValue; equal?: WidthHeightValue; max?: WidthHeightValue }
  height?:
    | WidthHeightValue
    | { min?: WidthHeightValue; equal?: WidthHeightValue; max?: WidthHeightValue }
} & StandardSizes &
  Pick<DimensionCssProps, 'grow' | 'shrink'> &
  Orientations

type FlexProps = {
  flex?: FlexCssProps['flexDirection']
  align?: alignment
  wrap?: boolean
  gap?: FlexCssProps['gap'] | 'space-between' | 'space-around' | SizeModifier
}

type PositionAndOverflowProps = {
  clipContent?: boolean
  scroll?: boolean | 'mandatory'

  absolute?: boolean
  fixed?: boolean
  relative?: boolean
  sticky?: boolean
  static?: boolean
  zIndex?: number
} & Pick<PositionCssProps, 'left' | 'right' | 'top' | 'bottom' | 'zIndex'>

export const dimensionsProcessor: Processor<MarginPaddingProps> = (
  props: MarginPaddingProps,
): AllCssProps & HTMLAttributes<never> => {
  const newProps: AllCssProps = { grow: props.grow, shrink: props.shrink }
  if (typeof props.width === 'object') {
    newProps.width = props.width.equal
    newProps.minWidth = props.width.min
    newProps.maxWidth = props.width.max
  } else {
    newProps.width = props.width
  }

  if (typeof props.height === 'object') {
    newProps.height = props.height.equal
    newProps.minHeight = props.height.min
    newProps.maxHeight = props.height.max
  } else {
    newProps.height = props.height
  }

  const sizes: Array<SizeModifier> = ['tiny', 'small', 'medium', 'big', 'huge']

  const size = getSize(props)
  if (props.margin !== undefined) {
    if (sizes.includes(props.margin as SizeModifier)) {
      newProps.margin = marginSizes[props.margin as SizeModifier]
    } else if (props.margin === true) {
      if (size) {
        newProps.margin = marginSizes[size]
      }
    } else if (props.margin) {
      newProps.margin = props.margin
    }
  }

  if (props.padding !== false) {
    if (size) {
      newProps.padding = paddingSizes[size]
    }
  } else {
    newProps.padding = undefined
  }
  if (props.padding !== undefined && typeof props.padding !== 'boolean') {
    if (sizes.includes(props.padding as SizeModifier)) {
      newProps.padding = paddingSizes[props.padding as SizeModifier]
    } else {
      newProps.padding = props.padding
    }
  }

  const orientationFromProps = getOrientation(props)

  if (typeof newProps.padding === 'number') {
    switch (orientationFromProps) {
      case 'vertical':
        newProps.padding = `${newProps.padding}px ${newProps.padding / 2}px`
        break
      case 'horizontal':
        newProps.padding = `${newProps.padding / 2}px ${newProps.padding}px`
        break
    }
  }

  if (props.padding === false) {
    newProps.padding = undefined
  }

  if (props.flush) {
    newProps.padding = 0
    newProps.margin = 0
  }

  return newProps
}

export const positionAndOverflowProcessor: Processor<PositionAndOverflowProps> = (
  props: PositionAndOverflowProps,
): AllCssProps & HTMLAttributes<never> => {
  const { left, right, top, bottom, zIndex } = props
  const newProps: AllCssProps = {
    left,
    right,
    top,
    bottom,
    zIndex,
  }

  if (props.absolute) {
    newProps.position = 'absolute'
  }
  if (props.fixed) {
    newProps.position = 'fixed'
  }
  if (props.relative) {
    newProps.position = 'relative'
  }
  if (props.sticky) {
    newProps.position = 'sticky'
  }
  if (props.static) {
    newProps.position = 'static'
  }

  if (props.clipContent) {
    newProps.overflow = 'hidden'
  }
  if (props.scroll === true) {
    newProps.overflow = 'auto'
  }
  if (props.scroll === 'mandatory') {
    newProps.overflow = 'scroll'
  }

  return newProps
}

export const layoutFlexProcessor: Processor<FlexProps> = (
  props: FlexProps,
): AllCssProps & HTMLAttributes<never> => {
  const newProps: AllCssProps = {}

  newProps.flexDirection = props.flex
  if (props.align && props.flex) {
    let verticalAlignment: undefined | flexAlignment = 'center'
    let horizontalAlignment: undefined | flexAlignment = 'center'

    const isReverse = props.flex.includes('reverse')
    const isRow = props.flex.includes('row')

    const start = isReverse ? 'flex-end' : 'flex-start'
    const end = isReverse ? 'flex-start' : 'flex-end'

    if (props.align.includes('top')) {
      horizontalAlignment = start
    } else if (props.align.includes('bottom')) {
      horizontalAlignment = end
    }

    if (props.align.includes('left')) {
      verticalAlignment = start
    } else if (props.align.includes('right')) {
      verticalAlignment = end
    }
    if (isRow) {
      newProps.justifyContent = verticalAlignment
      newProps.alignItems = horizontalAlignment
    } else {
      newProps.alignItems = verticalAlignment
      newProps.justifyContent = horizontalAlignment
    }
  }

  if (props.wrap === true) {
    newProps.flexWrap = 'wrap'
  }
  if (props.wrap === false) {
    newProps.flexWrap = 'nowrap'
  }

  const allSizes = ['tiny', 'small', 'medium', 'big', 'huge']

  if (typeof props.gap === 'number') {
    newProps.gap = props.gap
  } else if (allSizes.includes(props.gap as SizeModifier)) {
    newProps.gap = gapSizes[props.gap as SizeModifier]
  } else if (props.gap === 'space-between' || props.gap === 'space-around') {
    newProps.justifyContent = props.gap
  }

  return newProps
}

export const layoutProcessor = (
  props: FlexProps & MarginPaddingProps & PositionAndOverflowProps,
) => {
  const processor = combined(
    layoutFlexProcessor,
    dimensionsProcessor,
    positionAndOverflowProcessor,
  )
  return processor(props)
}
