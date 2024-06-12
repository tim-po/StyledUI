import styled, { css } from 'styled-components'
import { adaptive } from '../../core/processors/higherOrder/adaptive'
import { hoverable } from '../../core/processors/higherOrder/hover'
import { cssProcessor } from '../../core/processors/higherOrder'
import { visualisationProcessor } from '../../core/processors/visualisation'
import { positionAndOverflowProcessor } from '../../core/processors/layout'
import animationProcessor from '../../core/processors/animation'

type ImgProps = {
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

const imageProcessor = (props: ImgProps) => {
  if (!props.objectFit) {
    return { fragments: [css`object-fit: ${props.objectFit};`] }
  }
  return {}
}

const imgProcessor = cssProcessor(
  adaptive(
    hoverable(
      positionAndOverflowProcessor,
      visualisationProcessor,
      imageProcessor,
      animationProcessor,
    ),
  ),
)

const Img = styled.img`
  ${imgProcessor}
`

export default Img
