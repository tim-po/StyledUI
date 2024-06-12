import { css, FlattenSimpleInterpolation } from 'styled-components'

export type HasColorScheme<ComponentPropType> = {
  dark?: ComponentPropType
  light?: ComponentPropType
}

export const getColorScheme = function <ComponentProps>(
  props: HasColorScheme<ComponentProps>,
) {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return props.dark
  }
  return props.light
}

// TODO review
const ColorSchemeProcessor = function <ComponentProps>(
  processor: (props: HasColorScheme<ComponentProps>) => FlattenSimpleInterpolation,
) {
  return (props: HasColorScheme<ComponentProps>) => {
    return css`
      ${processor(props)};
      @media (prefers-color-scheme: dark) {
        ${props.dark ? processor(props.dark) : ''};
      }
      @media (prefers-color-scheme: light) {
        ${props.light ? processor(props.light) : ''};
      }
    `
  }
}

export default ColorSchemeProcessor
