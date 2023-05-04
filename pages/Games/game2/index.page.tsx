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

import styled from 'styled-components'
import { promises } from 'dns'
import { Button, Container, GameInput, Spinner } from 'components'
import { GenerateRequestToken, generateShareResponseToken, retrieveVCForRequestedToken, verifyShareResponseTokenPage } from '../tokenOperations'
import { useRouter } from 'next/router'
import Modal2 from 'components/Modal2/Modal2'
import { ModalProps, VCShareStateType, VerifiableCredential } from 'types/vc'
import { useStudioVcProfiles } from 'hooks/useVcProfiles'
import { Preferences, Reputation } from 'types/vc'

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

    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState<VCShareStateType | undefined>();
    const [message, setMessage] = useState("");
    const vcTypes = ["AffinidiStudioProfileVC", "GameSettings"];

    const handleShareVC = async (e: any) => {
        if (!data || !data?.requestToken || !openModal) {
            return;
        }
        setOpenModal(false)
        setIsloading(true)

        // holder creating share RESPONSE token 
        const shareResponseToken = await generateShareResponseToken(data.requestToken);
        //Verifier verifying the shared RESPONSE token against the REQUESTED token

        const verifyShareResponseOutPut = await verifyShareResponseTokenPage(data.requestToken, shareResponseToken)
        //and uses the VC if valid
        if (verifyShareResponseOutPut?.isValid) {
            const preferences = verifyShareResponseOutPut.suppliedCredentials.
                filter((x) => x.type.includes("GameSettings"))
                .pop();
            if (preferences) {
                setPreferences(preferences.credentialSubject)
            }
        }

        setIsloading(false)
    };

    const handleSubmit = async () => {
        setIsloading(true)
        setData(undefined);
        //verifier building share REQUEST token of two VC type, studio and game settings
        const reqToken = await GenerateRequestToken(vcTypes);

        //holder retrieving VC for requested toke 
        const { vcs } = await retrieveVCForRequestedToken(reqToken);

        console.log('vcs', vcs);
        if (!vcs || vcs.length == 0) {
            //No VCs found
            setMessage("We have not found any VCs of type " + vcTypes.join(', '))
        }
        else {
            //Get unique VC types
            const arr: string[] = vcs.map((v: VerifiableCredential) => v.type.pop()).flat();
            const uniqueArray = arr.filter((value, index) => arr.indexOf(value) === index);

            setData({
                requestToken: reqToken,
                vcTypesFound: uniqueArray
            });
        }

        setIsloading(false);
        setOpenModal(true);
    }

    return (<>
        <Modal2 onClose={() => setOpenModal(false)} open={openModal} title={data ? "Share VC" : "No Game Profile VCs"}>
            <div className="grid grid-cols-12 gap-16">
                <div className='col-span-12'>
                    {data && <>
                        <b>Requested VCs </b>
                        {data.vcTypesFound?.map(vc => <p key={vc} style={{ paddingLeft: '10px' }}>{vc}</p>)}<br />
                        By clicking 'Allow', you consent to sharing the above VC's.
                    </>
                    }
                    {message}
                </div>
                <div className='col-span-2'><Button onClick={(e) => setOpenModal(false)} color="secondary" style={{ color: 'white' }}>
                    Cancel</Button></div>
                <div className='col-span-10'>{data && <Button onClick={handleShareVC}>
                    Allow</Button>}</div>
            </div>
        </Modal2>
        <Button onClick={handleSubmit}>Import Preferences...</Button>
    </>)
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
                <Button onClick={(e) => (navigate.push(ROUTES.singIn))}>
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
    const { data: vcData, mutate: getVCs, isLoading, error } = useStudioVcProfiles()
    const [isloading, setIsloading] = useState<boolean>(false)
    const { authState, setAuthState } = useAuthContext()

    useEffect(() => {
        if (!authState.authorized) {
            return
        }
        getVCs()

    }, [authState.authorized])

    useEffect(() => {
        if (vcData) {
            setAuthState((prevState) => { return { ...prevState, vc: vcData.vcs } })
        }
    }, [vcData])

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
        score: 0,
        gameLevel: 1,
    })
    useEffect(() => {
        const interval = setInterval(() => {
            const pongGame = (window as any).pongGame
            if (pongGame?.playing) {
                setReputation((prevState) =>
                ({
                    ...prevState,                    
                    gameLevel: prevState.gameLevel + 1,
                    score: 0,
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
                        <div>Alias: {preferences.nickname} </div>
                        <div>Game Level: {reputation.gameLevel}</div>
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
                    {authState.authorized && authState.vc && (
                        <GameInput
                            id="nickName"
                            type="string"
                            label="Welcome: "
                            placeholder={authState.vc?.gamingStudio?.credentialSubject.Name || authState.vc?.gamingStudio?.credentialSubject.email}
                            style={{ border: "0px" }}
                        />)}

                    {!preferences.nickname && <Import setPreferences={setPreferences}
                        setIsloading={setIsloading} />
                    }
                    {isloading && (<Container>
                        <Spinner />
                    </Container>)}

                    {preferences.nickname && (
                        <>
                            <GameInput
                                id="GameAlias"
                                type="string"
                                label="Game player alias: "
                                placeholder={preferences.nickname}
                                style={{ border: "0px" }}
                            />
                            <GameInput
                                id="nickName"
                                type="string"
                                label="Game theme color: "
                                placeholder={preferences.themecolor}
                                style={{ border: "0px" }}
                            />
                            <GameInput
                                id="nickName"
                                type="string"
                                label="Game volume: "
                                placeholder={preferences.gamevolume + "%"}
                                style={{ border: "0px" }}
                            />
                        </>
                    )}
                </div>
            </div>
            <script src='/js/all.js' async type='text/javascript'></script>

        </S.Container>

    )
}

export default Game2



