import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Button, Typography } from 'components'


export const Home = styled.div`
  margin: 0px;
  padding: 11px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  text-align: center;
  padding-block-start: 30px;
`
export const HomeContainer = styled.div`
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  padding-inline: 12px;
  margin-inline: auto;
  width: 100%;
  max-width: 100%;
`

export const IconWrapper = styled.div`
  cursor: pointer;
  background-color: blueviolet;

  svg {
    width: ${pxToRem(32)};
    height: ${pxToRem(32)};

    @media (max-width: 24px) {
      width: ${pxToRem(24)};
      height: ${pxToRem(24)};
    }
  }
`
export const Container = styled.div`
display: flex;
// justify-content: space-between;
align-items: center;
padding: 11px;
box-sizing: border-box;
  position: relative;
  z-index: 1;
  text-align: center;
  padding-block-start: 130px;
`
export const ButtonWrapper = styled(Button)`
  margin-top: ${pxToRem(16)};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
