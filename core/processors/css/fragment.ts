import { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components'
import { CssProcessor } from '../../../types'

export type FragmentCssProps = {
  fragments?: FlattenInterpolation<ThemeProps<DefaultTheme>>[]
}
export const fragmentCssProcessor: CssProcessor<FragmentCssProps> = (
  props: FragmentCssProps = { fragments: [] },
) => {
  return css`
    ${
      props.fragments
        ? props.fragments
            .filter(fragment => fragment !== undefined)
            .map(fragment => css`${fragment}`)
        : ''
    }
  `
}
