import { DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components'
import { HTMLAttributes, ReactNode } from 'react'
import { AllCssProps } from './core'

export type CssProcessor<T> = (props: T) => FlattenInterpolation<ThemeProps<DefaultTheme>>

export type Processor<ShortcutsPropType> = (
  props: ShortcutsPropType,
) => AllCssProps & HTMLAttributes<never>

export type PropsFrom<T extends (props: any) => any> = Parameters<T>[0]

export type HigherOrderProcessor<BaseProcessorProps, AdditionalProps> = (
  processor: CssProcessor<AdditionalProps & BaseProcessorProps>,
) => CssProcessor<BaseProcessorProps & Partial<AdditionalProps>>

export type Wrapper<T> = (
  props: T & {
    children: ReactNode | ReactNode[]
  },
) => Element

export type ColorScheme = 'dark' | 'light'
