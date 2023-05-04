import styled, { css } from 'styled-components'

import { pxToRem } from 'utils'
import { Theme } from 'utils/theme'

import Box from '../Box/Box'
import Typography from '../Typography/Typography'

type Props = {
  $hasError?: boolean;
  $disabled?: boolean;
  theme: Theme;
};

export const GameInputWrapper = styled(Box)`
  margin-bottom: ${pxToRem(12)};
`
const getTextColor = (props: Props) => {
  if (props.$hasError) {
    return props.theme.colors.utility.danger['90']
  }
  else{
    return  props.theme.colors.utility.info['100']
  }

  if (props.$disabled) {
    return props.theme.colors.neutral.primary['90']
  }

  return ''
}

export const Label = styled(Typography)<{
  $hasError?: boolean;
  $disabled?: boolean;
}>`
  color: ${getTextColor};
`

export const InputWrapper = styled.div`
  position: relative;
`

const getIconColor = (props: Props) => {
  if (props.$hasError) {
    return props.theme.colors.utility.danger['90']
  }

  if (props.$disabled) {
    return props.theme.colors.neutral.primary['90']
  }

  return props.theme.colors.neutral.secondary['100']
}

export const Icon = styled.div<Props>`
  position: absolute;
  top: 50%;
  right: ${pxToRem(16)};
  transform: translate(0, -50%);
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'unset')};

  svg {
    display: block;
    fill: ${getIconColor};
  }
`

export const Input = styled.input<
  Pick<Props, '$hasError'> & { $hasIcon: boolean }
>`
  width: flex%;
  height: ${pxToRem(10)};
  padding: ${pxToRem(10)} ${pxToRem(12)};
  background: transparent;
  color: ${(props) => props.theme.colors.neutral.primary['35']};
  font-weight: 500;
  font-size: ${pxToRem(15)};
  border-radius: 4px;
  line-height: ${pxToRem(22)};
  letter-spacing: 0.2px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'text')};
  transition: border-color 0.125s ease-in-out;
  outline: none;
  border: 1px solid ${(props) => props.theme.colors.neutral.primary['90']};

  ${(props) =>
    props.$hasIcon &&
    css`
      padding-right: ${pxToRem(48)};
    `}
  ${(props) =>
    props.$hasError &&
    css`
      padding: ${pxToRem(15)} ${pxToRem(11)};
      border: 2px solid ${props.theme.colors.utility.danger['90']};
    `}
  ${(props) =>
    !props.$hasError &&
    css`
      &:not([disabled]) {
        &:hover {
          border-color: ${props.theme.colors.neutral.secondary['70']};
        }

        &:focus {
          padding: ${pxToRem(15)} ${pxToRem(11)};
          border: 2px solid ${props.theme.colors.neutral.secondary['70']};
        }
      }
    `}
  ::placeholder {
    font-weight: 500;
    color: ${(props) => props.theme.colors.neutral.primary['70']};
  }

  &[disabled] {
    color: ${(props) => props.theme.colors.neutral.primary['90']};

    ::placeholder {
      color: ${(props) => props.theme.colors.neutral.primary['90']};
    }
  }
`

export const HelpText = styled(Typography)<{
  $hasError?: boolean;
  $disabled?: boolean;
}>`
  color: ${getTextColor};
`
export const Select = styled.select<
  Pick<Props, '$hasError'> & { $hasIcon: boolean }
>`
  width: flex%;
  height: ${pxToRem(10)};
  padding: ${pxToRem(10)} ${pxToRem(12)};
  background: transparent;
  color: ${(props) => props.theme.colors.neutral.primary['35']};
  font-weight: 500;
  font-size: ${pxToRem(15)};
  border-radius: 4px;
  line-height: ${pxToRem(22)};
  letter-spacing: 0.2px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'text')};
  transition: border-color 0.125s ease-in-out;
  outline: none;
  border: 1px solid ${(props) => props.theme.colors.neutral.primary['90']};

  ${(props) =>
    props.$hasIcon &&
    css`
      padding-right: ${pxToRem(48)};
    `}
  ${(props) =>
    props.$hasError &&
    css`
      padding: ${pxToRem(15)} ${pxToRem(11)};
      border: 2px solid ${props.theme.colors.utility.danger['90']};
    `}
  ${(props) =>
    !props.$hasError &&
    css`
      &:not([disabled]) {
        &:hover {
          border-color: ${props.theme.colors.neutral.secondary['100']};
        }

        &:focus {
          padding: ${pxToRem(15)} ${pxToRem(11)};
          border: 2px solid ${props.theme.colors.neutral.secondary['100']};
        }
      }
    `}
  ::placeholder {
    font-weight: 500;
    color: ${(props) => props.theme.colors.neutral.primary['70']};
  }

  &[disabled] {
    color: ${(props) => props.theme.colors.neutral.primary['90']};

    ::placeholder {
      color: ${(props) => props.theme.colors.neutral.primary['90']};
    }
  }
`