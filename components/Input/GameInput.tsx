import React, { forwardRef, InputHTMLAttributes, useState } from 'react'

import * as S from './GameInput.style'
import { Placeholder } from 'react-bootstrap';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  icon?: React.ReactElement;
  hasError?: boolean;
  helpText?: string;
  Gamvolume?: string
  onChange?: (value: string) => void;
}

const GameInputSlider = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, hasError, helpText, label, icon, className, Gamvolume, ...props }, ref) => {
    const [volume, setVolume] = useState(Gamvolume || 30);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        setVolume(e.target.value);
        onChange(e.target.value)
      }
    }

    return (
      <S.GameInputWrapper direction="row" gap={4} className={className}>
        {label && (
          <S.Label
            variant="p4"
            tag="label"
            $hasError={hasError}
            $disabled={props.disabled}
          >
            {label}
          </S.Label>
        )}

        <S.InputWrapper>
          <section>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={handleChange}
            />
            <> : {volume} %</>
          </section>

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
      </S.GameInputWrapper>
    )
  }
)

GameInputSlider.displayName = 'GameInputSlider'

export { GameInputSlider }

const GameInputSelect = forwardRef<HTMLSelectElement, InputProps>(
  ({ onChange, hasError, helpText, label, icon, className, color, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <S.GameInputWrapper direction="row" gap={4} className={className}>
        {label && (
          <S.Label
            variant="p4"
            tag="label"
            $hasError={hasError}
            $disabled={props.disabled}
          >
            {label}
          </S.Label>
        )}

        <S.InputWrapper>
          <select
            id="color"
            name="color"
            value={color}
            style={{ border: "1px solid #000" }}
            onChange={handleChange}>
            <option>Select a color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="grey">Grey</option>
          </select>
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
      </S.GameInputWrapper>
    )
  }
)

GameInputSelect.displayName = 'GameInputSelect'

export { GameInputSelect }

const GameInput = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, hasError, helpText, label, icon, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <S.GameInputWrapper direction="row" gap={4} className={className}>
        {label && (
          <S.Label
            variant="p4"
            tag="label"
            $hasError={hasError}
            $disabled={props.disabled}
          >
            {label}
          </S.Label>
        )}

        <S.InputWrapper>
          <S.Input
            onChange={handleChange}
            data-testid="input"
            $hasError={hasError}
            ref={ref}
            $hasIcon={!!icon}
            {...props}
          />

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
      </S.GameInputWrapper>
    )
  }
)
GameInput.displayName = 'Input'

export default GameInput
