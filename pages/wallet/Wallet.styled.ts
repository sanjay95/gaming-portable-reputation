import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'

export const ServiceSelect = styled(Typography)`
  margin: ${pxToRem(40)} 0;
`

export const CardRow = styled.div`
  padding-left: 12.5rem;
  padding-top: 5rem;
  color: white;
  font-size: 2rem;
`

export const CardItem = styled.div`
  color: black;
  background-color:white;
  padding: 1rem;
`

export const Title = styled.h1`
  color: white;
  padding-top: 15rem;
  font-size: xx-large;
  line-height: 2rem;
`
