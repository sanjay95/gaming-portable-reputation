import { FC, useState, useEffect, FormEvent } from 'react'
import { useAuthContext } from 'hooks/useAuthContext'
import axios from 'axios'
import * as S from './Games.styled'
import { CloseIcon } from 'assets/close'
import { MenuIcon } from 'assets/menu'
import { Container, GameInput, Spinner } from 'components'
// import toast
import { useRouter } from 'next/router'
import { useAuth } from 'pages/useAuth'
import { useStudioVcProfiles } from 'hooks/useVcProfiles'
import { Preferences, Reputation, VerifiableCredential } from 'types/vc'
import { GameInputSelect, GameInputSlider } from 'components/Input/GameInput'
import { SaveGamePreferences } from './components/SaveGamePreferences'
import { SaveGameStats } from './components/SaveGameStats'
import { GenerateRequestToken, generateShareResponseToken, retrieveVCForRequestedToken, verifyShareResponseTokenPage } from '../tokenOperations'
import { stat } from 'fs'

const Game1: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [instruction, setInstruction] = useState(false)
    const [preferenceVC, setPreferenceVC] = useState<VerifiableCredential | undefined>()
    const { isAuthorized } = useAuth()
    const navigate = useRouter()
    const { data: vcData, mutate: getVCs, isLoading, error } = useStudioVcProfiles()
    const [isProfileInputOpen, setIsProfileInputOpen] = useState(false)
    const [isloading, setIsloading] = useState<boolean>(false)
    const { authState, setAuthState } = useAuthContext()
    const [preferences, setPreferences] = useState<Preferences>({
        gamename: 'Game1',
        vcId: '',
        nickname: '',
        themecolor: '',
        gamevolume: '30'
    })
    const [reputation, setReputation] = useState<Reputation>({
        vcId: '',
        gamename: 'boardTennis',
        publisher: 'affGames',
        company: '4Vesta',
        genere: 'arcade',
        totalPlayedhours: .2,
        score: 0,
        gameLevel: 1
    })


    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const finalVolume = muted ? 0 : volume;

    const handleAliasChange = (value: string) => {

        setPreferences((prevState) => ({ ...prevState, nickname: value }));

    }
    const handlColorChange = (value: string) => {
        setPreferences((prevState) => ({ ...prevState, themecolor: value }));

    }
    const handleVolumeChange = (value: string) => {
        setPreferences((prevState) => ({ ...prevState, gamevolume: value }));

    }
    const getPreferenceandSettings = async (): Promise<VerifiableCredential[] | undefined> => {

        try {
            setIsloading(true);
            const requesttoken = await GenerateRequestToken(["AffinidiStudioProfileVC", "GameSettings", "GameReputation"]);
            const vcs = await retrieveVCForRequestedToken(requesttoken);
            // prompt to share vcs
            //TODO  
            const shareResponseToken = await generateShareResponseToken(requesttoken);
            const verifyShareResponseOutPut = await verifyShareResponseTokenPage(requesttoken, shareResponseToken)

            setIsloading(false);

            if (verifyShareResponseOutPut?.isValid) {
                const validVcs: VerifiableCredential[] = [];
                const preferenceVC = verifyShareResponseOutPut.suppliedCredentials.
                    filter((x) => x.type.includes("GameSettings"))
                    .pop();
                if (preferenceVC != undefined) {
                    validVcs.push(preferenceVC);
                }
                const ReputationVC = verifyShareResponseOutPut.suppliedCredentials.
                    filter((x) => x.type.includes("GameReputation"))
                    .pop();

                if (ReputationVC != undefined) {
                    validVcs.push(ReputationVC);
                }
                console.log("pref/reputation VC", validVcs);

                return validVcs;
            }

        } catch (e) {
            console.error(e);
        }

        return undefined;
    };
    useEffect(() => {
        (async () => {
            if (isAuthorized) {

                const vcs = await getPreferenceandSettings();
                const PreferenceVC = vcs?.filter((x) => x.type.includes("GameSettings")).pop();
                const statsVC = vcs?.filter((x) => x.type.includes("GameReputation")).pop();
                setPreferenceVC(PreferenceVC);
                if (PreferenceVC) {
                    console.log('setting perf VC',)
                    preferences.gamename = preferences.gamename || preferenceVC?.credentialSubject.gamename
                    preferences.themecolor = PreferenceVC?.credentialSubject.themecolor
                    preferences.nickname = PreferenceVC?.credentialSubject.nickname
                    preferences.vcId = PreferenceVC?.id
                    preferences.gamevolume = PreferenceVC?.credentialSubject.gamevolume
                }
                if (statsVC) {
                    console.log('setting stats VC',)
                    reputation.gameLevel = statsVC.credentialSubject.gameLevel
                    reputation.totalPlayedhours = statsVC.credentialSubject.totalPlayedhours
                    reputation.vcId = statsVC.id
                }
            }

        })();
    }, [isAuthorized]);

    useEffect(() => {

        if (!isAuthorized) {
            setIsProfileInputOpen(false)
            return
        }

        getVCs()

    }, [isAuthorized])

    useEffect(() => {

        if (vcData) {
            setAuthState((prevState) => { return { ...prevState, vc: vcData.vcs } })
        }
    }, [vcData])

    useEffect(() => {
        if (authState.authorized) {

            setIsProfileInputOpen(false)
        }

        if (authState.authorized && authState.vc && !authState.vc.gamingStudio) {

            setIsProfileInputOpen(true)
        }

    }, [authState.vc])

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
                        <div className='col-span-3'>
                            <canvas id='game' style={{ backgroundColor: preferences.themecolor || "black", contentVisibility: isMenuOpen ? "hidden" : "visible" }}>
                                <div id='unsupported'>
                                    Sorry, this example cannot be run because your browser does
                                    not support the &ltcanvas&gt element
                                </div>
                            </canvas>
                        </div>
                        <div className='col-span-3'>

                            <div style={{ display: "flex" }}>
                                <SaveGameStats gamesettings={reputation} setIsloading={setIsloading} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-6'>
                    <div className="grid lg:grid-cols-0 lg:gap-1" style={{ paddingTop: "25px" }}>
                        <S.Form className="lg:col-start-2">
                            {isAuthorized && (
                                <GameInput
                                    id="nickName"
                                    type="string"
                                    label="Welcome: "
                                    placeholder={vcData?.vcs.gamingStudio?.credentialSubject.Name || vcData?.vcs.gamingStudio?.credentialSubject.email}
                                    style={{ border: "0px" }}

                                />)}
                            <GameInput
                                id="GameAlias"
                                type="string"
                                label="Game player alias: "
                                onChange={handleAliasChange}
                                placeholder={preferences.nickname || vcData?.vcs.gamingStudio?.credentialSubject.name}

                            />
                            <GameInputSelect
                                id="GameTheme"
                                type="string"
                                label="Game theme color: "
                                color={preferences.themecolor || vcData?.vcs.gamingStudio?.credentialSubject.color}
                                placeholder="Enter your Name"
                                onChange={handlColorChange}
                            />
                            <GameInputSlider
                                id="GameVolume"
                                type="string"
                                label="Game volume: "
                                Gamvolume={preferences.gamevolume}
                                // placeholder="Enter your Name"
                                onChange={handleVolumeChange}
                            />
                            <div style={{ display: "flex" }}>
                                <SaveGamePreferences preferences={preferences} setIsloading={setIsloading} />
                            </div>
                        </S.Form>
                    </div>

                    {isloading && (
                        <Container>
                            <Spinner />
                        </Container>
                    )}
                </div>
            </div>
            <script src='/js/all.js' async type='text/javascript'></script>
        </S.Container>
    )
}

export default Game1
