import Link from 'next/link'
import { FC } from 'react'
import Image from 'next/image'

import { ROUTES } from 'utils'
import logo from 'public/images/logo.svg'
import { CloseIcon } from 'assets/close'
import { MenuIcon } from 'assets/menu'
import { Modal, Typography } from 'components'

import { useNavBar } from './useNavBar'
import * as S from './NavBar.styled'
import afflogo from '../../../assets/images/affinidi-logo.png'


const NavBar: FC = () => {
  // const { isMenuOpen, setIsMenuOpen, isAuthorized, handleLogOut } = useNavBar()

  return (
    <>
      <S.Container  >
        <S.Logo href="/">
          <Image src={afflogo.src} alt="PortId"  width="64" height="64" />
        </S.Logo>

        {/* {isAuthorized && (
          <>
            {isMenuOpen ? (
              <S.IconWrapper>
                <CloseIcon onClick={() => setIsMenuOpen(false)} aria-label="menu-close-icon" />
              </S.IconWrapper>
            ) : (
              <S.IconWrapper>
                <MenuIcon onClick={() => setIsMenuOpen(true)} aria-label="menu-open-icon" />
              </S.IconWrapper>
            )}
          </>
        )} */}
      </S.Container>

      {/* {isAuthorized && (
        <Modal
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          position="rightSide"
        >
          <S.Content alignItems="flex-end">
            <S.ButtonContainer>
              <Link
                href={ROUTES.profileSetup}
                onClick={() => setIsMenuOpen(false)}
              >
                <Typography variant="b1">Home</Typography>
              </Link>
            </S.ButtonContainer>

            <S.ButtonContainer onClick={handleLogOut}>
              <Typography variant="b1">Log out</Typography>
            </S.ButtonContainer>
          </S.Content>
        </Modal>
      )} */}
    </>
  )
}

export default NavBar
