import { css, FlattenSimpleInterpolation } from 'styled-components'
import { ColorScheme } from '../../../types'

export type MaterialPart = 'background' | 'fill' | 'separator'
type ThicknessModifier = 'opaque' | 'thick' | 'regular' | 'thin' | 'ultraThin'
export type MaterialConfig = {
  separator: () => FlattenSimpleInterpolation
  fill: (opacity: number) => FlattenSimpleInterpolation
  background: (thickness: ThicknessModifier) => FlattenSimpleInterpolation
  font: () => FlattenSimpleInterpolation
}

export type ThicknessProps = {
  defaultMaterialThickness?: ThicknessModifier
  opaqueMaterial?: boolean
  thickMaterial?: boolean
  regularMaterial?: boolean
  thinMaterial?: boolean
  ultraThinMaterial?: boolean
}

export const getThickness = (props: ThicknessProps) => {
  if (props.opaqueMaterial) {
    return 'opaque'
  }
  if (props.thickMaterial) {
    return 'thick'
  }
  if (props.regularMaterial) {
    return 'regular'
  }
  if (props.thinMaterial) {
    return 'thin'
  }
  if (props.ultraThinMaterial) {
    return 'ultraThin'
  }
  if (props.defaultMaterialThickness) {
    return props.defaultMaterialThickness
  }
  return undefined
}

export const strokeMaterials = {
  dark: '#999',
  light:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), rgba(128, 128, 128, 0.30)',
}

export const materialFragments: Record<ColorScheme, MaterialConfig> = {
  dark: {
    separator: () => css`
      background: ${strokeMaterials.dark};
      background-blend-mode: hard-light, overlay;
      backdrop-filter: blur(0px);
    `,
    fill: (opacity: number) => {
      return css`
        background: linear-gradient(0deg, #C2C2C2 0%, #C2C2C2 100%), rgba(127, 127, 127, ${opacity});
        background-blend-mode: overlay, luminosity;
        backdrop-filter: blur(25px);
      `
    },
    font: () => {
      return css`color: white;`
    },
    background: (thickness: ThicknessModifier) => {
      switch (thickness) {
        case 'opaque':
          return css`
            background: rgb(0, 0, 0);
          `
        case 'thick':
          return css`
            background-color: rgba(37, 37, 37, 0.9);
            background-image: linear-gradient(0deg, rgba(156, 156, 156, 0.25) 0%, rgba(156, 156, 156, 0.25) 100%);
            background-blend-mode: overlay;
            backdrop-filter: blur(25px);`
        case 'regular':
          return css`
            background-color: rgba(37, 37, 37, 0.82);
            background-image: linear-gradient(0deg, rgba(156, 156, 156, 0.2) 0%, rgba(156, 156, 156, 0.2) 100%);
            background-blend-mode: overlay;
            backdrop-filter: blur(25px);
          `
        case 'thin':
          return css`
            background-color: rgba(37, 37, 37, 0.70);
            background-image: linear-gradient(0deg, rgba(156, 156, 156, 0.2) 0%, rgba(156, 156, 156, 0.2) 100%);
            background-blend-mode: overlay;
            backdrop-filter: blur(25px);
          `
        case 'ultraThin':
          return css`
            background-color: rgba(37, 37, 37, 0.55);
            background-image: linear-gradient(0deg, rgba(156, 156, 156, 0.2) 0%, rgba(156, 156, 156, 0.2) 100%);
            background-blend-mode: overlay;

            backdrop-filter: blur(14px);
          `
      }
    },
  },
  light: {
    separator: () => css`
      background: ${strokeMaterials.light};
      background-blend-mode: luminosity, color-burn;
      backdrop-filter: blur(0px);
    `,
    fill: (opacity: number) => {
      return css`
        background: linear-gradient(0deg, #3D3D3D 0%, #3D3D3D 100%), rgba(127, 127, 127, ${opacity});
        background-blend-mode: overlay, luminosity;
        backdrop-filter: blur(0px);`
    },
    font: () => {
      return css`color: black;`
    },
    background: (thickness: ThicknessModifier) => {
      switch (thickness) {
        case 'opaque':
          return css`
            background: rgb(255, 255, 255);
          `
        case 'thick':
          return css`
            background: rgba(153, 153, 153, 0.97);
            background-blend-mode: color-dodge, normal;
            backdrop-filter: blur(25px);
          `
        case 'regular':
          return css`
            background: rgba(179, 179, 179, 0.82);
            background-blend-mode: color-dodge, normal;
            backdrop-filter: blur(25px);
          `
        case 'thin':
          return css`
            background: rgba(166, 166, 166, 0.70);
            background-blend-mode: color-dodge, normal;
            backdrop-filter: blur(25px);`
        case 'ultraThin':
          return css`
            background: rgba(191, 191, 191, 0.44);
            background-blend-mode: color-dodge, normal;
            backdrop-filter: blur(25px);
          `
      }
    },
  },
}
