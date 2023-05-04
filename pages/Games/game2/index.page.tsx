import { FC, useState, useEffect } from 'react'
import { useAuthContext } from 'hooks/useAuthContext'
import Link from 'next/link'
import { ROUTES } from 'utils'
import axios from 'axios'
import * as S from './Games.styled'
import { CloseIcon } from 'assets/close'
import { MenuIcon } from 'assets/menu'
// import toast
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication'
import { ModalProps as ReactModalProps } from 'react-responsive-modal'
import { verifyShareResponseTokenResult } from '../../../types/verifyShareResponseResult'
import styled from 'styled-components'
import { promises } from 'dns'
import { Button, Container, Spinner } from 'components'
import { GenerateRequestToken, generateShareResponseToken, retrieveVCForRequestedToken, verifyShareResponseTokenPage } from '../tokenOperations'
import { useRouter } from 'next/router'

export type ModalProps = {
    useLocalContainer?: boolean;
    useRelativePosition?: boolean;
    title?: string;
    footer?: React.ReactElement;
    position?: 'center' | 'rightSide';
} & ReactModalProps;

export type Preferences = {
    gamename?: string
    vcId?: string
    nickname: string
    themecolor: string
    gamevolume: string
}

export type Reputation = {
    vcId?: string
    gamename: string
    publisher: string
    company: string
    genere: string
    totalPlayedhours: number
    scores: {
        Gamelevel: number
        score: number
    }
}
export const hasPreferenceVC = async (): Promise<boolean> => {
    try {
        const response = await axios(`/api/game/has-preferences`, {
            method: 'POST',
            headers: createCloudWalletAuthenticationHeaders(),
        })

        return response.data.hasPreferences
    } catch (e) {
        console.error(e)
    }

    return false
}

const ImportButton: FC<{
    setPreferences: (preferences: Preferences) => void
    setIsloading: (setIsloading: boolean) => void
}> = ({ setPreferences, setIsloading }) => {


    const handleSubmit = async () => {
        setIsloading(true)
        //verifier building share REQUEST token of two VC type, studio and game settings
        const requesttoken = await GenerateRequestToken(["AffinidiStudioProfileVC", "GameSettings"]);

        //holder retrieving VC for requested toke 
        const vcs = await retrieveVCForRequestedToken(requesttoken);
        // prompt to share 
        //TODO

        // holder creating share RESPONSE token 
        const shareResponseToken = await generateShareResponseToken(requesttoken);
        //Verifier verifying the shared RESPONSE token against the REQUESTED token

        const verifyShareResponseOutPut = await verifyShareResponseTokenPage(requesttoken, shareResponseToken)
        //and uses the VC if valid
        if (verifyShareResponseOutPut?.isValid) {
            const preferences = verifyShareResponseOutPut.suppliedCredentials.
                filter((x) => x.type.includes("GameSettings"))
                .pop();
            if (preferences) {
                setPreferences(preferences.credentialSubject)
                setIsloading(false)
            }
        }
        setIsloading(false);

    }

    return <Button onClick={handleSubmit}>Import Preferences...</Button>
}

const Import: FC<{
    setPreferences: (preferences: Preferences) => void
    setIsloading: (setIsloading: boolean) => void
}> = ({
    setPreferences, setIsloading
}) => {
        const { authState, setAuthState } = useAuthContext()
        const [showImport, setShowImport] = useState(false)
        const [loading, setLoading] = useState(true)
        const navigate = useRouter()
        useEffect(() => {
            (async () => {
                const hasPreferences: boolean = await hasPreferenceVC()
                setShowImport(hasPreferences)
                setLoading(false)
            })()
        }, [])

        if (!authState.authorized) {
            return (
                // <Link href={ROUTES.singIn} style={{
                //     boxSizing: "border-box",
                //     overflow: "hidden",
                //     textOverflow: "ellipsis",
                //     lineHeight: "23px",
                //     fontSize: "15px",
                //     display: "inline-block"
                // }}>
                     <Button onClick={(e)=>(navigate.push(ROUTES.singIn))}>
                    Login With Affinidi Game wallet to sync preferences</Button>
                // </Link>
            )
        }

        if (loading) {
            return <div>Loading...</div>
        }

        if (!showImport) {
            return (<><div>No preferences found in your Cloud Wallet!</div><div> set now </div></>
            )
        }

        return <ImportButton setPreferences={setPreferences}
            setIsloading={setIsloading} />
    }
const Instructions: FC<ModalProps> = ({
    title,
    children,
    footer,
    position = 'center',
    onClose,
    ...rest
}) => {
    const modalAnimationIn =
        position === 'rightSide' ? 'slideFromRightIn' : 'zoomIn'
    const modalAnimationOut =
        position === 'rightSide' ? 'slideFromRightOut' : 'zoomOut'
    return (
        // <S.Container>
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
        // </S.Container>
    )
}

const Game2: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [instruction, setInstruction] = useState(false)
    const [isloading, setIsloading] = useState<boolean>(false)
    const [preferences, setPreferences] = useState<Preferences>({
        gamename: 'Game1',
        vcId: '',
        nickname: '',
        themecolor: '',
        gamevolume: '30'
    })
    const [reputation, setReputation] = useState<Reputation>({
        vcId: '',
        gamename: 'ScreenTennis',
        publisher: 'affGames',
        company: '4Vesta',
        genere: 'arcade',
        totalPlayedhours: .1,
        scores: {
            Gamelevel: 1,
            score: 0
        }
    })
    useEffect(() => {
        const interval = setInterval(() => {
            const pongGame = (window as any).pongGame
            if (pongGame?.playing) {
                setReputation((prevState) =>
                ({
                    ...prevState,
                    scores: {
                        Gamelevel: prevState.scores.Gamelevel + 1,
                        score: 0
                    },
                    totalPlayedhours: (prevState.totalPlayedhours + Math.floor(Math.random() * 2))

                }));
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <S.Container style={{ backgroundColor: "white", paddingLeft: "20rem" }}>
            <div style={{ paddingBottom: "400px" }} className="grid grid-flow-row-dense grid-cols-12">
                <div className='col-span-6'>
                    <div className="grid grid-flow-row-dense grid-cols-3">
                        <div>Alias Name: {preferences.nickname} </div>
                        <div>Game Level: {reputation.scores.Gamelevel}</div>
                        <div>Hours Played: {reputation.totalPlayedhours}</div>
                        <div className='col-span-3'><canvas id='game' style={{ backgroundColor: preferences.themecolor || "black", contentVisibility: isMenuOpen ? "hidden" : "visible" }}>
                            <div id='unsupported'>
                                Sorry, this example cannot be run because your browser does
                                not support the &ltcanvas&gt element
                            </div>
                        </canvas>
                        </div>
                    </div>
                </div>
                <div className='col-span-6' style={{ paddingTop: "25px", paddingLeft: "25px", textAlign: 'left' }}>
                    {!preferences.nickname && <Import setPreferences={setPreferences}
                        setIsloading={setIsloading} />
                    }
                    {isloading && (<Container>
                        <Spinner />
                    </Container>)}

                    {preferences.nickname && (
                        <>
                            Your Nick Name:{' '}
                            <span id='tests'
                                style={{
                                    color: preferences?.themecolor || "inherit",
                                    fontSize: '5rem',
                                }}>
                                {preferences.nickname}
                            </span></>
                    )}
                </div>
            </div>

            <script src='/js/all.js' async type='text/javascript'></script>

        </S.Container>

    )
}

export default Game2



