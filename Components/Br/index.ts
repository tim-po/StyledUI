import { adaptiveCssProcessor } from '../../core/processors/higherOrder/adaptive'
import styled from 'styled-components'
import { PropsFrom } from '../../types'
import { processors } from '../../core'

const brProcessor = adaptiveCssProcessor(processors.css.dimensions)

const Br = styled.div<PropsFrom<typeof brProcessor>>`
  ${brProcessor}
`

export default Br
