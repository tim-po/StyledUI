import Input from '../Input'
import { getColorScheme } from '../../core/processors/higherOrder/colorScheme'
import { css, DefaultTheme } from 'styled-components'

const InputField = Input

InputField.defaultProps = {
  css: {
    fragments: [
      css`
        background: transparent;
        border: 2px solid white;
        color: white;
        padding: 2px 4px;
        border-radius: 4px;
        outline: none !important;

        &:hover {
          border: 2px solid ${(props: { theme: DefaultTheme }) =>
            getColorScheme(props.theme.colors)?.primary};
        }
      `,
    ],
  },
}

export default InputField
