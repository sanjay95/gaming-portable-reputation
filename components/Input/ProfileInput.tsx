import React, { forwardRef, InputHTMLAttributes } from 'react'

import * as S from './Input.styled'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  icon?: React.ReactElement;
  hasError?: boolean;
  helpText?: string;
  onChange?: (value: string) => void;
}

const ProfileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, hasError, helpText, label, icon, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <><>{label && (
        <S.Label
          variant="p4"
          tag="label"
          $hasError={hasError}
          $disabled={props.disabled}
        >
          {label}
        </S.Label>
      )}
      </><S.Wrapper direction="column" gap={4} className={className}>

          <S.InputWrapper>
            <S.Input
              onChange={handleChange}
              data-testid="input"
              $hasError={hasError}
              ref={ref}
              $hasIcon={!!icon}
              {...props} />

            {icon && (
              <S.Icon $hasError={hasError} $disabled={props.disabled}>
                {icon}
              </S.Icon>
            )}
          </S.InputWrapper>

          {helpText && (
            <S.HelpText
              variant="p3"
              $hasError={hasError}
              $disabled={props.disabled}
            >
              {helpText}
            </S.HelpText>
          )}
        </S.Wrapper></>
    )
  }
)
ProfileInput.displayName = 'profileInput'

export default ProfileInput
