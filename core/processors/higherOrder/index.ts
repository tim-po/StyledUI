import { CssProcessor, Processor } from '../../../types'
import { css } from 'styled-components'
import { AllCssProps, processors } from '../../index'
import { Adaptive } from './adaptive'
import { Hoverable } from './hover'

const omitUndefined = (obj: any) => {
  Object.keys(obj)
    .filter(k => obj[k] === undefined)
    .forEach(k => delete obj[k])
  return obj
}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

export type PropsIntersectionFromArrayOfFunctions<
  Processors extends ((props: any) => any)[],
> = UnionToIntersection<
  Parameters<{ [I in keyof Processors]: Processors[I] }[number]>[number]
>

export const combinedCssProcessors = <Processors extends CssProcessor<any>[]>(
  ...rest: Processors
): CssProcessor<PropsIntersectionFromArrayOfFunctions<Processors>> => {
  return (
    props: UnionToIntersection<
      Parameters<{ [I in keyof Processors]: Processors[I] }[number]>[number]
    >,
  ) => {
    return css`
      ${rest.map(processor => {
        return css`${processor(props)}`
      })}
    `
  }
}

export const combined = <Processors extends Processor<any>[]>(...rest: Processors) => {
  return (props: PropsIntersectionFromArrayOfFunctions<Processors>) => {
    let combinedProps: AllCssProps = {}
    rest.forEach(processor => {
      const newProps = processor(props)
      combinedProps = {
        ...omitUndefined(combinedProps),
        ...omitUndefined(newProps || {}),
        fragments: [...(combinedProps.fragments || []), ...(newProps.fragments || [])],
      }
    })

    return { ...combinedProps }
  }
}

export const cssProcessor = <NonCssProcessors extends Processor<any>[]>(
  ...rest: NonCssProcessors
) => {
  return (
    props: Adaptive<
      Hoverable<
        PropsIntersectionFromArrayOfFunctions<NonCssProcessors> & {
          css?: AllCssProps
        }
      >
    >,
  ) => {
    return css`
      ${props.css && processors.css.all(props.css)}
      ${rest.map(processor => {
        return css`${processors.css.all(processor(props))}`
      })}
    `
  }
}
