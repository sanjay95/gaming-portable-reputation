import React from 'react';
import { FC, useEffect } from 'react'
import { ROUTES } from 'utils'
import * as S from './Games.styled'
// import { Game1, Game2 } from '../games';
import * as G from '../games';
import { CardRow } from 'pages/profile-setup/ProfileSetup.styled';
import { Col, Container, Row } from 'react-bootstrap';

type GamePropTypes = {
  heading: string
  redirect?: any
}


const Games: FC<GamePropTypes> = ({ heading, redirect }) => {
  let games = Object.values(G)
  return (
    <>

      <S.Home
        id='home'
      >
        <S.HomeContainer
          className='container'
        >
          <Row>
            {games.map((Game, i) => {

              return (
                <Col sm={2} md={2} className='mt-20' key={i + 1} >
                  <div className="card" style={{ width: '20rem' }}>
                    <Game></Game>
                  </div>
                </Col>
              )
            })}

            {/* <div className="card" style={{ width: '18rem' }}>
              <Game2></Game2>
            </div> */}
          </Row>
        </S.HomeContainer>
      </S.Home>
    </>
  )
}

export default Games
