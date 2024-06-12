export type GlobalValues = 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer'

export type AutoCssValue = 'auto'
export type NoneCssValue = 'none'
export type NormalCssValue = 'normal'

type Unit =
  | 'px'
  | 'em'
  | 'rem'
  | '%'
  | 'vw'
  | 'vh'
  | 'ch'
  | 'ex'
  | 'cm'
  | 'mm'
  | 'in'
  | 'pt'
  | 'pc'

export type NumberAndUnit = `${number}${Unit}`

export type UnitValue = `${NumberAndUnit}` | 0 | number | GlobalValues | string

export type FourSidesUnitValue =
  | `${NumberAndUnit | 0} ${NumberAndUnit | 0}`
  | `${NumberAndUnit | 0} ${NumberAndUnit | 0} ${NumberAndUnit | 0} ${NumberAndUnit | 0}`

export type WidthHeightValue =
  | 'max-content'
  | 'min-content'
  | 'fit-content'
  | 'fill-available'
  | 'stretch'
  | UnitValue
  | AutoCssValue
  | GlobalValues

export type MarginPaddingValue =
  | AutoCssValue
  | GlobalValues
  | UnitValue
  | FourSidesUnitValue

export function CssFrom(value: string | number) {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value
}
