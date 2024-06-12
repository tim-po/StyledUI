import styled, { css } from 'styled-components'
import { adaptive } from '../../core/processors/higherOrder/adaptive'
import { hoverable } from '../../core/processors/higherOrder/hover'
import { dimensionsProcessor, layoutFlexProcessor } from '../../core/processors/layout'
import { typographyProcessor } from '../../core/processors/typography'
import { cssProcessor } from '../../core/processors/higherOrder'
import { visualisationProcessor } from '../../core/processors/visualisation'
import { lighten } from 'color2k'
import { getColorScheme } from '../../core/processors/higherOrder/colorScheme'
import { defaultColors } from '../../theme'
import {Processor, PropsFrom} from '../../types'
import { AllCssProps } from '../../core'
import animationProcessor from '../../core/processors/animation'

type ButtonShortcutProps = {
  primary?: boolean
  secondary?: boolean
  disabledStyle?: boolean
}

const disabledPrimary = css`
  background: #c6c6c6;
  color: #707070;
`

const disabledSecondary = css`
  color: #707070;
  border: 2px solid #707070;
`
const buttonShortcutsProcessor: Processor<ButtonShortcutProps> = (
  props: ButtonShortcutProps,
) => {
  const colors = getColorScheme(defaultColors)

  const newProps: AllCssProps = {
    fragments: [
      css`${
        props.primary &&
        css`
            background: ${colors?.primary};
            color: white;
            font-weight: bold;

            ${props.disabledStyle && disabledPrimary}
            &:hover {
              background: ${lighten(colors?.primary || '', 0.1)};

              ${props.disabledStyle && disabledPrimary}
            }
          `
      }
      ${
        props.secondary &&
        css`
            color: ${colors?.primary};
            border: 2px solid ${colors?.primary};
            font-weight: bold;
            background: transparent;

            ${props.disabledStyle && disabledSecondary}
            &:hover {
              color: ${lighten(colors?.primary || '', 0.2)};
              border: 2px solid ${lighten(colors?.primary || '', 0.2)};
              ${props.disabledStyle && disabledSecondary}

            }
          `
      }`,
    ],
  }
  return newProps
}

const buttonProcessor = cssProcessor(
  adaptive(
    hoverable(
      visualisationProcessor,
      typographyProcessor,
      layoutFlexProcessor,
      dimensionsProcessor,
      animationProcessor,
      buttonShortcutsProcessor,
    ),
  ),
)

const Button = styled.button<PropsFrom<typeof buttonProcessor>>`
  ${buttonProcessor}
`

Button.defaultProps = {
  materialPart: 'fill',
  clickable: true,
  transition: 0.2,
  defaultSize: 'medium',
  defaultAspectRatio: 'horizontal',
}

export default Button
