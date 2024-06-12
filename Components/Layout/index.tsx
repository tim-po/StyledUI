import { adaptive } from 'StyledUI/core/processors/higherOrder/adaptive'
import styled, { css } from 'styled-components'
import { hoverable } from 'StyledUI/core/processors/higherOrder/hover'
import { AllCssProps } from '../../core'
import { Processor } from '../../types'
import { layoutProcessor } from '../../core/processors/layout'
import { HTMLAttributes } from 'react'
import { cssProcessor } from '../../core/processors/higherOrder'
import { visualisationProcessor } from '../../core/processors/visualisation'
import animationProcessor from '../../core/processors/animation'

type LayoutShortcuts = {
  pageLayout?: boolean
  barLayout?: boolean
  headerLayout?: boolean
  fillContainer?: boolean
  fullWidth?: boolean
}

const layoutShortcutsProcessor: Processor<LayoutShortcuts> = (
  props: LayoutShortcuts,
): AllCssProps & HTMLAttributes<never> => {
  let newProps: AllCssProps & HTMLAttributes<never> = {}
  if (props.fillContainer) {
    newProps = {
      width: '100%',
      height: '100%',
      margin: 0,
      alignItems: 'stretch',
      fragments: [css`box-sizing: border-box;`],
    }
  }
  if (props.pageLayout) {
    newProps = {
      className: 'page',
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      fragments: [css`box-sizing: border-box;`],
    }
  }
  if (props.barLayout) {
    newProps = {
      className: 'bar',
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      margin: 0,
      borderRadius: 0,
    }
  }

  if (props.headerLayout) {
    newProps = {
      className: 'header',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      margin: 0,
      borderRadius: 0,
    }
  }

  if (props.fullWidth) {
    newProps = {
      width: '100%',
      margin: 0,
      borderRadius: 0,
    }
  }
  return newProps
}

const Layout = styled.div`
  ${cssProcessor(
    adaptive(
      hoverable(
        layoutShortcutsProcessor,
        visualisationProcessor,
        animationProcessor,
        layoutProcessor,
      ),
    ),
  )}
`

Layout.defaultProps = {
  gap: 'medium',
}

export default Layout
