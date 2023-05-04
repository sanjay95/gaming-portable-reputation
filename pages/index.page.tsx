import { useRouter } from 'next/router'
import { FC, FormEvent, useEffect, useState } from 'react'
import { ROUTES } from 'utils'
import herobaner from '../assets/images/new/Fotor_AI.png'
import bannerBg from '../assets/images/hero-banner-bg.png'
import Games from './components/Home/Games'
import Tournament from './components/Home/Tournament'
import Contact from './components/Home/Contact'
import News from './components/Home/News'
import * as S from './index.styled'
import { useAuth } from './useAuth'
import { useAuthContext } from 'hooks/useAuthContext'
import ProfileVCModal from 'components/ProfileVCModal/ProfileVCModal'
import { useStudioVcProfiles } from 'hooks/useVcProfiles'
import Profile from './components/StudioProfileSetup/index.page'


const Home: FC = () => {
  const { isAuthorized } = useAuth()
  const navigate = useRouter()

  const { data: vcData, mutate: getVCs, isLoading, error } = useStudioVcProfiles()
  const [isProfileInputOpen, setIsProfileInputOpen] = useState(false)
  const { authState, setAuthState } = useAuthContext()

  useEffect(() => {
    console.log('Authorized ? ', isAuthorized)
    if (!isAuthorized) {
      setIsProfileInputOpen(false)
      return
    }
    console.log('Authorized, and Getting VCs')
    getVCs()

  }, [isAuthorized])

  useEffect(() => {
    if (vcData) {
      setAuthState((prevState) => { return { ...prevState, vc: vcData.vcs } })
    }
  }, [vcData])

  useEffect(() => {
    if (authState.authorized) {
      console.log('VCs', authState.vc)
      setIsProfileInputOpen(false)
    }

    if (authState.authorized && authState.vc && !authState.vc.gamingStudio) {
      console.log('No gaming profile VC')
      setIsProfileInputOpen(true)
    }
  }, [authState.vc])


  const redirect = (e: any, path: string) => {
    e.preventDefault()
    navigate.push(path)
    return false
  }


  return (
    <>
      <S.Home
        id='roothome'
      >
        <S.HomeContainer
          className='container'
        >
          <p
            className='section-subtitle'
            style={{
              margin: '0px',
              padding: '0px',
              boxSizing: 'border-box',
              textAlign: 'center',
              color: 'hsla(0, 0%, 100%, 1)',
              fontWeight: 600,
              fontSize: '1.6rem',
              textTransform: 'uppercase',
              letterSpacing: '10px',
            }}
          >
            Enjoy The Games
          </p>
          <h1
            className='h1 title hero-title'
            style={{
              margin: '0px',
              padding: '0px',
              boxSizing: 'border-box',
              color: 'hsla(0, 0%, 100%, 1)',
              fontSize: '6.5rem',
              fontWeight: 600,
              marginBlock: '20px 25px',
              lineHeight: 1,
            }}
          >
            Legendry Games Made For{' '}
            <br
              style={{ margin: '0px', padding: '0px', boxSizing: 'border-box' }}
            />{' '}
            True Gamers!
          </h1>
          <a
            className='btn'
            onClick={(e) => { redirect(e, ROUTES.singIn) }}
            style={{
              margin: '0px',
              padding: '0px',
              boxSizing: 'border-box',
              textDecoration: 'none',
              cursor: 'pointer',
              placeItems: 'center',
              paddingInline: '30px',
              overflow: 'hidden',
              position: 'relative',
              backgroundImage:
                'linear-gradient(to right bottom, hsl(299, 100%, 52%), hsl(291, 100%, 58%), hsl(283, 100%, 60%), hsl(273, 100%, 62%), hsl(262, 100%, 63%), hsl(242, 100%, 69%), hsl(223, 100%, 62%), hsl(210, 100%, 50%), hsl(203, 100%, 50%), hsl(198, 100%, 50%), hsl(192, 100%, 48%), hsl(185, 90%, 48%))',
              color: 'hsla(0, 0%, 100%, 1)',
              fontSize: '1.5rem',
              fontWeight: 600,
              maxWidth: 'max-content',
              minWidth: '180px',
              height: '50px',
              display: 'grid',
              clipPath: 'polygon(0% 0%, 90% 0, 100% 30%, 100% 100%, 0 100%)',
              marginInline: 'auto',
            }}
          >
            {isAuthorized?(`Explore Games`):( `Join With Us`)}
           
          </a>
          <div
            className='hero-banner'
            style={{
              margin: '0px',
              padding: '0px',
              boxSizing: 'border-box',
              position: 'relative',
              marginBlockStart: '50px',
            }}
          >
            <img
              className='w-100'
              height={414}
              width={850}
              alt='hero banner'
              src={herobaner.src}
              style={{
                margin: '0px',
                padding: '0px',
                boxSizing: 'border-box',
                display: 'block',
                height: 'auto',
                width: '100%',
                marginInline: 'auto',
                maxWidth: 'max-content',
              }}
            />
            <img
              className='hero-banner-bg'
              src={bannerBg.src}
              style={{
                margin: '0px',
                padding: '0px',
                boxSizing: 'border-box',
                height: 'auto',
                display: 'block',
                width: '100%',
                position: 'absolute',
                bottom: '0px',
                left: '0px',
                transformOrigin: 'center bottom',
                zIndex: -1,
                transform: 'scale(1.2)',
              }}
            />
          </div>
        </S.HomeContainer>
      </S.Home>

      <div id='games'>
        <Games heading={'games'} redirect={redirect} />
      </div>

      <div id='tournament'>
        <Tournament heading={'tournament'} redirect={redirect} />
      </div>

      <div id='news'>
        <News heading={'news'} redirect={redirect} />
      </div>

      <div id='contact'>
        <Contact heading={'contact'} redirect={redirect} />
      </div>
      {isProfileInputOpen && (
        <ProfileVCModal
          open={isProfileInputOpen}
          onClose={() => setIsProfileInputOpen(false)}
          position='center'
        >
          <Profile />
        </ProfileVCModal>
      )}

    </>
  )
}

export default Home
