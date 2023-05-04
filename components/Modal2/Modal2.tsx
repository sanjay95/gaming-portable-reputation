import React from 'react'
import Modal, { ModalProps as ReactModalProps } from 'react-responsive-modal'

import Typography from '../Typography/Typography'
import 'react-responsive-modal/styles.css';
import * as S from './Modal2.styled'

export type ModalProps = {
  useLocalContainer?: boolean;
  useRelativePosition?: boolean;
  title?: string;
  footer?: React.ReactElement;
  position?: 'rightSide' | 'center';
} & ReactModalProps;

const Modal2: React.FC<ModalProps> = ({
  title,
  children,
  footer,
  position = 'center',
  onClose,
  ...rest
}) => {

  return (
    <Modal center open={rest.open} onClose={onClose} >
      {title && (
        <>
          <S.Title>
            {title}<hr />
          </S.Title>
        </>
      )}
      <S.Content>{children}</S.Content>
    </Modal>
  )
}

export default Modal2
