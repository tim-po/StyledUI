export const TransitionPresets = {
  bezier: (time: number) => ({
    property: 'all',
    time: time,
    timingFunction: 'cubic-bezier(.91,-0.32,.51,1.13)',
    delay: 0,
  }),
  bezierOut: (time: number, delay: number) => ({
    property: 'all',
    time: time,
    timingFunction: 'cubic-bezier(.42,0,.41,1.22)',
    delay: delay,
  }),
  absoluteFadeIn: (time: number) => `width 0, height 0, opacity ${time} ease-in-out`,
  easeInOut: (time: number, delay = 0) => ({
    property: 'all',
    time: time,
    timingFunction: 'ease-in-out',
    delay: delay,
  }),
}

export const TransitionTimingFunctions = {
  bezier: 'cubic-bezier(.91,-0.32,.51,1.13)',
  bezierOut: 'cubic-bezier(.42,0,.41,1.22)',
  easeInOut: 'ease-in-out',
}
