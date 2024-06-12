import { AnimationDirection } from '../../core/processors/animation'
import { keyframes } from 'styled-components'
import { Side } from '../../core/processors/visualisation'

export const slide = (props: {
  side: Side
  time?: number
  timingFunction?: string
  direction?: 'in' | 'out'
}) => {
  const startValue = '100%'
  const endValue = '0'
  let direction: AnimationDirection = 'normal'
  if (props.direction && props.direction == 'out') {
    direction = 'reverse'
  }
  let transformStringFrom = ''
  let transformStringTo = ''
  switch (props.side) {
    case 'top':
      transformStringFrom = `translateY(-${startValue})`
      transformStringTo = `translateY(-${endValue})`
      break
    case 'bottom':
      transformStringFrom = `translateY(${startValue})`
      transformStringTo = `translateY(${endValue})`
      break
    case 'left':
      transformStringFrom = `translateX(-${startValue})`
      transformStringTo = `translateX(-${endValue})`
      break
    case 'right':
      transformStringFrom = `translateX(${startValue})`
      transformStringTo = `translateX(${endValue})`
      break
  }
  return {
    keyframes: keyframes`
      from {
        transform: ${transformStringFrom});
      }
      to {
        transform: ${transformStringTo};
      }
    `,
    time: props.time || 0.5,
    iterations: 1,
    timingFunction: props.timingFunction || 'ease-in-out',
    direction: direction,
  }
}
