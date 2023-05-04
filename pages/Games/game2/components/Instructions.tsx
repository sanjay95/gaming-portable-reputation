import { FC } from 'react';
import * as S from '../Games.styled';
import { ModalProps } from 'types/vc';

export const Instructions: FC<ModalProps> = ({
    title, children, footer, position = 'center', onClose, ...rest
}) => {
    const modalAnimationIn = position === 'rightSide' ? 'slideFromRightIn' : 'zoomIn';
    const modalAnimationOut = position === 'rightSide' ? 'slideFromRightOut' : 'zoomOut';
    return (
        <S.Container>
            <div id='sidebar' style={{ position: "fixed" }}>
                <div className='description'>
                    <p>This is a javascript version of Pong.</p>
                    <p>
                        Press <b>1</b> for a single player game.
                        <br />
                        Press <b>2</b> for a double player game.
                        <br />
                        Press <b>0</b> to watch the computer play itself.
                    </p>
                    <p>
                        Player 1 moves using the <b>Q</b> and <b>A</b> keys.
                        <br />
                        Player 2 moves using the <b>P</b> and <b>L</b> keys.
                    </p>
                    <p>
                        <b>Esc</b> can be used to abandon a game.
                    </p>
                </div>


            </div>
        </S.Container>
    );
};
