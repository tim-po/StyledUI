import { adaptive } from 'StyledUI/core/processors/higherOrder/adaptive'
import { hoverable } from 'StyledUI/core/processors/higherOrder/hover'
import styled from 'styled-components'
import { AllCssProps } from '../../core'
import { cssProcessor } from '../../core/processors/higherOrder'
import {
  layoutFlexProcessor,
  positionAndOverflowProcessor,
} from '../../core/processors/layout'
import { Processor } from '../../types'
import { HTMLAttributes } from 'react'
import animationProcessor from '../../core/processors/animation'

type FlexShortcuts = {
  column?: boolean
  row?: boolean
  reverse?: boolean
}

const flexShortcutsProcessor: Processor<FlexShortcuts> = (
  props: FlexShortcuts,
): AllCssProps & HTMLAttributes<never> => {
  if (props.row) {
    return {
      flexDirection: `row${props.reverse ? '-reverse' : ''}`,
    }
  }
  if (props.column) {
    return {
      flexDirection: `column${props.reverse ? '-reverse' : ''}`,
    }
  }

  return {}
}

const flexProcessor = cssProcessor(
  adaptive(
    hoverable(
      flexShortcutsProcessor,
      positionAndOverflowProcessor,
      animationProcessor,
      layoutFlexProcessor,
    ),
  ),
)

const Flex = styled.div`
  ${flexProcessor}
`

Flex.defaultProps = {
  gap: 'medium',
  flex: 'row',
}

export default Flex
