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
  padding-block-start: 250px;
`
export const HomeContainer = styled.div`
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  padding-inline: 12px;
  margin-inline: auto;
  width: 100%;
  max-width: 1140px;
`

export const Prompt = styled(Typography)`
  margin: ${pxToRem(40)} 0;

  @media (max-width: 1024px) {
    margin: ${pxToRem(40)} 0 ${pxToRem(24)};
  }
`

export const ButtonWrapper = styled(Button)`
  margin-top: ${pxToRem(16)};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
