import styled from 'styled-components'

import { pxToRem } from 'utils'

export const Container = styled.div`
  padding: 1rem ${pxToRem(100)};

  @media (max-width: 1024px) {
    padding: 1rem ${pxToRem(24)};
  }
`

export const Title = styled.div`
  padding: ${pxToRem(40)} ${pxToRem(24)} 0;
`
