import styled from 'styled-components'
import { hoverable } from '../../core/processors/higherOrder/hover'
import { adaptive } from '../../core/processors/higherOrder/adaptive'
import { cssProcessor } from '../../core/processors/higherOrder'
import { layoutProcessor } from '../../core/processors/layout'
import { visualisationProcessor } from '../../core/processors/visualisation'
import { typographyProcessor } from '../../core/processors/typography'
import animationProcessor from '../../core/processors/animation'

const rectangleProcessor = cssProcessor(
  adaptive(
    hoverable(
      layoutProcessor,
      typographyProcessor,
      visualisationProcessor,
      animationProcessor,
    ),
  ),
)

const Rectangle = styled.div`
  ${rectangleProcessor}
`

export default Rectangle
