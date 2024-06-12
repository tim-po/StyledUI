export type Orientation = 'vertical' | 'center' | 'horizontal'

export interface Orientations {
  vertical?: boolean
  defaultAspectRatio?: Orientation
  center?: boolean
  horizontal?: boolean
}

export function getOrientation(props: Orientations) {
  if (props.vertical) {
    return 'vertical'
  }
  if (props.center) {
    return 'center'
  }
  if (props.horizontal) {
    return 'horizontal'
  }
  if (props.defaultAspectRatio) {
    return props.defaultAspectRatio
  }
  return 'center'
}
