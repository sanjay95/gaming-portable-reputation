import React from 'react'
import { Modal as ReactModal } from 'react-responsive-modal'
import styled, { css } from 'styled-components'

import { pxToRem } from 'utils'

import Box from '../Box/Box'

import { ModalProps } from './Modal2'


export const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  padding: 1rem;
`


export const Content = styled(Box)`
  padding: 1rem;
`

