import { css } from 'styled-components'
import { CssProcessor, Processor } from '../../../types'
import {
  combined,
  combinedCssProcessors,
  PropsIntersectionFromArrayOfFunctions,
  UnionToIntersection,
} from './index'

export type Hoverable<ComponentPropType> = ComponentPropType & {
  hover?: ComponentPropType
}

export const hoverableCssProcessor = function <Processors extends CssProcessor<any>[]>(
  ...processors: Processors
) {
  return (props: Hoverable<PropsIntersectionFromArrayOfFunctions<Processors>>) => {
    const processor = combinedCssProcessors(...processors)
    return css`
      ${processor(props)}

      ${
        props.hover &&
        css`
            &:hover {
              ${processor(Object.assign(props, props.hover))}
            }
          `
      }
    `
  }
}

export const hoverable = function <Processors extends Processor<any>[]>(
  ...processors: Processors
) {
  return (
    props: Hoverable<
      UnionToIntersection<
        Parameters<{ [I in keyof Processors]: Processors[I] }[number]>[number]
      >
    >,
  ) => {
    const processor = combined(...processors)
    return {
      ...processor(props),
      hover: props.hover ? processor(props.hover) : {},
    }
  }
}
