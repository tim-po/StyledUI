import { CssProcessor, Processor } from '../../../types'
import { css } from 'styled-components'
import {
  combined,
  combinedCssProcessors,
  PropsIntersectionFromArrayOfFunctions,
  UnionToIntersection,
} from './index'

const MOBILE_MAX_WIDTH = 1000

export type Adaptive<ProcessorProps> = ProcessorProps & {
  mobileBreakpoint?: number
  mobile?: ProcessorProps
  desktop?: ProcessorProps
}

export const adaptiveCssProcessor = <Processors extends CssProcessor<any>[]>(
  ...processors: Processors
) => {
  return (props: Adaptive<PropsIntersectionFromArrayOfFunctions<Processors>>) => {
    const processor = combinedCssProcessors(...processors)
    return css`
      ${processor(props)};

      @media (max-width: ${props.mobileBreakpoint || MOBILE_MAX_WIDTH}px) {
        ${props.mobile && processor(props.mobile)};
      }

      @media (min-width: ${props.mobileBreakpoint || MOBILE_MAX_WIDTH}px) {
        ${props.desktop && processor(props.desktop)};
      }
    `
  }
}

export const adaptive = <Processors extends Processor<any>[]>(
  ...processors: Processors
) => {
  return (
    props: Adaptive<
      UnionToIntersection<
        Parameters<{ [I in keyof Processors]: Processors[I] }[number]>[number]
      >
    >,
  ) => {
    const processor = combined(...processors)
    return {
      mobileBreakpoint: props.mobileBreakpoint || MOBILE_MAX_WIDTH,
      mobile: props.mobile && processor(props.mobile),
      desktop: props.desktop && processor(props.desktop),
      ...processor(props),
    }
  }
}
