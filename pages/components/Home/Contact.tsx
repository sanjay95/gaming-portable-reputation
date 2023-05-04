import { FC, useEffect } from 'react'
import { ROUTES } from 'utils'
import * as S from './common.styled'

type ContactPropTypes = {
  heading: string
  redirect?: any
}


const Contact: FC<ContactPropTypes> = ({ heading, redirect }) => {

  return (
    <>
    <S.Home
      id='contacthome'
    >
      <S.HomeContainer
        className='container'
      >
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
          Contact Us For More Details {' '}
          <br
            style={{ margin: '0px', padding: '0px', boxSizing: 'border-box' }}
          />{' '}
          Here!
        </h1>
      
      </S.HomeContainer>
    </S.Home>
  </>
  )
}

export default Contact
