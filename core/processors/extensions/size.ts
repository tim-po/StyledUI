export type SizeModifier = 'tiny' | 'small' | 'medium' | 'big' | 'huge'

export interface StandardSizes {
  flush?: boolean
  defaultSize?: SizeModifier
  medium?: boolean
  tiny?: boolean
  small?: boolean
  big?: boolean
  huge?: boolean
}

export function getSize(props: StandardSizes) {
  if (props.tiny) {
    return 'tiny'
  }
  if (props.small) {
    return 'small'
  }
  if (props.medium) {
    return 'medium'
  }
  if (props.big) {
    return 'big'
  }
  if (props.huge) {
    return 'huge'
  }
  if (props.defaultSize) {
    return props.defaultSize
  }
  return undefined
}
