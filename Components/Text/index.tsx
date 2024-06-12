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
      positionAndOverflowProcessor,
      dimensionsProcessor,
      animationProcessor,
      typographyProcessor,
    ),
  ),
)
export const Text = styled.span<PropsFrom<typeof textProcessor>>`
  ${textProcessor}
`

const label = styled.div<PropsFrom<typeof textProcessor>>`
  ${textProcessor}
`
label.defaultProps = {
  label: true,
}

export const Label = label

const h1 = styled.h1<PropsFrom<typeof textProcessor>>`
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  ${textProcessor}
`
h1.defaultProps = {
  h1: true,
}
export const H1 = h1

const h2 = styled.h2<PropsFrom<typeof textProcessor>>`
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  ${textProcessor}
`
h2.defaultProps = {
  h2: true,
}
export const H2 = h2

const h3 = styled.h3<PropsFrom<typeof textProcessor>>`
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  ${textProcessor}
`
h3.defaultProps = {
  h3: true,
}
export const H3 = h3

const h4 = styled.h4<PropsFrom<typeof textProcessor>>`
  ${textProcessor}
`
h4.defaultProps = {
  h4: true,
}
export const H4 = h4
