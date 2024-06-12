export type TypographyStandardElements = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'label'

export type TypographyElements = Partial<Record<TypographyStandardElements, boolean>> & {
  defaultTypographyElement?: TypographyStandardElements
}

export function getElement(props: TypographyElements): TypographyStandardElements {
  if (props.h1) {
    return 'h1'
  }
  if (props.h2) {
    return 'h2'
  }
  if (props.h3) {
    return 'h3'
  }
  if (props.h4) {
    return 'h4'
  }
  if (props.body) {
    return 'body'
  }
  if (props.label) {
    return 'label'
  }
  if (props.defaultTypographyElement) {
    return props.defaultTypographyElement
  }
  return 'body'
}
