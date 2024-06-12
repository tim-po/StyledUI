import animationProcessor from './processors/animation'
import { flexCssProcessor, FlexCssProps } from './processors/css/flex'
import { positionCssProcessor, PositionCssProps } from './processors/css/position'
import { fontCssProcessor, FontCssProps } from './processors/css/font'
import {
  visualisationCssProcessor,
  VisualisationCssProps,
} from './processors/css/visualisation'
import { fragmentCssProcessor, FragmentCssProps } from './processors/css/fragment'
import { dimensionCssProcessor, DimensionCssProps } from './processors/css/dimensions'
import { layoutProcessor } from './processors/layout'
import { typographyProcessor } from './processors/typography'
import { visualisationProcessor } from './processors/visualisation'
import { Adaptive, adaptiveCssProcessor } from './processors/higherOrder/adaptive'
import { Hoverable, hoverableCssProcessor } from './processors/higherOrder/hover'

export type AllCssProps = FlexCssProps &
  PositionCssProps &
  DimensionCssProps &
  VisualisationCssProps &
  FontCssProps &
  FragmentCssProps

export const processors = {
  css: {
    position: positionCssProcessor,
    dimensions: dimensionCssProcessor,
    flex: flexCssProcessor,
    font: fontCssProcessor,
    visualisation: visualisationCssProcessor,
    fragment: fragmentCssProcessor,
    all: (props: Adaptive<Hoverable<AllCssProps>>) => {
      const processors = adaptiveCssProcessor(
        hoverableCssProcessor(
          positionCssProcessor,
          dimensionCssProcessor,
          flexCssProcessor,
          visualisationCssProcessor,
          fontCssProcessor,
          fragmentCssProcessor,
        ),
      )
      return processors(props)
    },
  },
  animation: animationProcessor,
  layout: layoutProcessor,
  typography: typographyProcessor,
  visualisation: visualisationProcessor,
}
