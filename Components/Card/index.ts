import styled from 'styled-components'
import { hoverable } from '../../core/processors/higherOrder/hover'
import { adaptive } from 'StyledUI/core/processors/higherOrder/adaptive'
import { cssProcessor } from '../../core/processors/higherOrder'
import { visualisationProcessor } from '../../core/processors/visualisation'
import { layoutProcessor } from '../../core/processors/layout'
import animationProcessor from '../../core/processors/animation'
import { PropsFrom } from '../../types'

const cardProcessor = cssProcessor(
  adaptive(hoverable(animationProcessor, visualisationProcessor, layoutProcessor)),
)

export type CardProps = PropsFrom<typeof cardProcessor>

const Card = styled.div`
  ${cardProcessor}
`

Card.defaultProps = {
  defaultSize: 'medium',
  defaultMaterialThickness: 'thick',
  materialPart: 'background',
  gap: 'medium',
}

export default Card
