import { css, Keyframes, keyframes } from 'styled-components'
import { Processor } from '../../types'
import { GlobalValues } from '../../TypedCss'

type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'

export type AnimationConfig = {
  keyframes: Keyframes
  time: number
  pause?: boolean // 'paused' | 'running'
  timingFunction?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
  delay?: number
  direction?: AnimationDirection | AnimationDirection[] | GlobalValues
  iterations?: number | 'infinite'
}

export const animations: Record<string, AnimationConfig> = {
  spin: {
    keyframes: keyframes`
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    `,
    time: 1,
    iterations: 'infinite',
    timingFunction: 'linear',
  },
  shake: {
    keyframes: keyframes`
      from {
        transform: translateX(0px);
      }

      25% {
        transform: translateX(10px);
      }

      75% {
        transform: translateX(-10px);
      }

      to {
        transform: translateX(0px);
      }
    `,
    time: 0.2,
    iterations: 5,
    timingFunction: 'ease-in-out',
  },
}

export const generateAnimation = (config: AnimationConfig) => {
  return css`
    animation: ${config.time}s ${config.timingFunction} ${
    config.delay ? `${config.delay}s` : ''
  } ${config.iterations ? `${config.iterations}` : ''} ${
    config.direction ? `${config.direction}` : ''
  } ${config.pause !== undefined ? `${!config.pause ? 'paused' : 'running'}` : ''} ${
    config.keyframes
  };
  `
}

export type transitionConfig = {
  property: 'all' | string
  time: number
  timingFunction?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
  delay?: number
}

export const generateTransition = (config: transitionConfig) => {
  return css`
    transition: ${config.property} ${config.time}s ${config.timingFunction} ${
    config.delay ? `${config.delay}s` : ''
  };
  `
}

export type TransitionProps = {
  transition?: string | transitionConfig | number
  animation?: string | AnimationConfig
}

const animationProcessor: Processor<TransitionProps> = (props: TransitionProps) => {
  let transitionCss = css``
  if (typeof props.transition === 'number') {
    transitionCss = css`
      ${props.transition ? css`transition: all ${props.transition}s;` : ''};
    `
  } else if (typeof props.transition === 'string') {
    transitionCss = css`
      ${props.transition ? css`transition: ${props.transition};` : ''};
    `
  } else if (props.transition && props.transition?.property && props.transition?.time) {
    transitionCss = css`
      ${generateTransition(props.transition)}
    `
  }

  let animationCss = css``
  if (typeof props.animation === 'string') {
    animationCss = css`
      ${props.animation ? css`animation: ${props.animation};` : ''}
    `
  } else if (props.animation && props.animation?.time && props.animation?.keyframes) {
    animationCss = css`
      ${generateAnimation(props.animation)}
    `
  }

  return {
    fragments: [
      css`
        ${transitionCss}
        ${animationCss}
      `,
    ],
  }
}

export default animationProcessor
