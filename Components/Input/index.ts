import styled from 'styled-components'
import { hoverable } from '../../core/processors/higherOrder/hover'
import { adaptive } from 'StyledUI/core/processors/higherOrder/adaptive'
import { cssProcessor } from '../../core/processors/higherOrder'
import { dimensionsProcessor } from '../../core/processors/layout'
import { typographyProcessor } from '../../core/processors/typography'
import { visualisationProcessor } from '../../core/processors/visualisation'
import animationProcessor from '../../core/processors/animation'

const inputProcessor = cssProcessor(
  adaptive(
    hoverable(
      dimensionsProcessor,
      typographyProcessor,
      visualisationProcessor,
      animationProcessor,
    ),
  ),
)

const Input = styled.input`
  ${inputProcessor}`

export default Input
