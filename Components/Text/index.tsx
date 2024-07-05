import styled from 'styled-components'
import { hoverable } from 'StyledUI/core/processors/higherOrder/hover'
import { adaptive } from '../../core/processors/higherOrder/adaptive'
import { PropsFrom } from '../../types'
import { typographyProcessor } from '../../core/processors/typography'
import {
  dimensionsProcessor,
  positionAndOverflowProcessor,
} from '../../core/processors/layout'
import { cssProcessor } from '../../core/processors/higherOrder'
import animationProcessor from '../../core/processors/animation'

const textProcessor = cssProcessor(
  adaptive(
    hoverable(
      typographyProcessor,
      positionAndOverflowProcessor,
      dimensionsProcessor,
      animationProcessor,
    ),
  ),
)
export const Text = styled.span<PropsFrom<typeof textProcessor>>`
  ${textProcessor}
`

const label = Text
label.defaultProps = {
  label: true,
}

export const Label = label

const h1 = Text
label.defaultProps = {
  h1: true,
}
export const H1 = h1

const h2 = Text
label.defaultProps = {
  h2: true,
}
export const H2 = h2

const h3 = Text
label.defaultProps = {
  h1: true,
}
export const H3 = h3

const h4 = Text
label.defaultProps = {
  h1: true,
}
export const H4 = h4
