import { FontCssProps } from '../../core/processors/css/font'
import { Text } from '../../Components/Text'
import React, { ReactNode } from 'react'
import Rectangle from '../../Components/Rectangle'

type LabeledProps = FontCssProps &
  Parameters<typeof Rectangle>[number] & {
    title: string
    children: ReactNode | ReactNode[]
  }

const LabeledDefaultProps = {
  flex: 'column',
  gap: 'small',
  small: true,
}

const Labeled = (props: LabeledProps) => {
  return (
    <Rectangle {...props}>
      <Text label {...props}>
        {props.title}
      </Text>
      {props.children}
    </Rectangle>
  )
}

Labeled.defaultProps = LabeledDefaultProps

export default Labeled
