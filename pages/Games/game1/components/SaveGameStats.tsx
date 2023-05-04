import { FC, useState, useEffect } from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import axios from 'axios';
import * as S from '../Games.styled';
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication';
import { Preferences,Reputation } from '../index.page';
import { hasPreferenceVC } from 'pages/Games/tokenOperations';

export const SaveGameStats: FC<{ gamesettings: Reputation; 
    setIsloading: (setIsloading: boolean) => void }> = ({ gamesettings,setIsloading }) => {
        console.log(gamesettings);
    const { authState, setAuthState } = useAuthContext();
    const [showExport, setShowExport] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const hasPreferences: boolean = await hasPreferenceVC();
            setShowExport(!hasPreferences);
            setLoading(false);
        })();
    }, []);

    if (!authState.authorized) {
        return (
            <><S.ButtonWrapper
                // disabled={disabled}
                type="button"
                //onClick={handleSubmit}
                fullWidth
            >Please sign in to save your stats..
                  {/* {!isAuthorized ? ('Please sign in to save your settings..'):('Save Game Settings')} */}
            </S.ButtonWrapper>

            </>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (!showExport) {
    //     return <div>Settings were already saved!</div>;
    // }
    return (
        <ExportButton gamesettings={gamesettings} setShowExport={setShowExport} setIsloading={setIsloading}  />
    );
};
const ExportButton: FC<{
    gamesettings: Reputation;
    setShowExport: (showExport: boolean) => void;
    setIsloading: (setIsloading: boolean) => void
}> = ({ gamesettings, setShowExport,setIsloading }) => {

    const handleSubmit = async (e: any) => {
        setIsloading(true);
        try {
            e.preventDefault();
            const headers = createCloudWalletAuthenticationHeaders();
            if (gamesettings.vcId) {
                const response = await axios(
                    `/api/cloud-wallet/delete-vc`,
                    {
                        method: "POST",
                        headers,
                        data: { vcId: gamesettings.vcId },
                    }
                );
                console.log('delete result', response);
            }

            delete gamesettings['vcId'];
            console.log('########', gamesettings);
            const response = await axios(
                `/api/game/save-gameStats`,
                {
                    method: "POST",
                    headers,
                    data: gamesettings,
                }
            );

            setShowExport(false);
            const wind = window as any;
            if (wind.Game && wind.Pong) {
                wind.Game.start("game", wind.Pong, {
                    sound: false,
                    stats: true,
                    footprints: true,
                    predictions: true,
                });
            }
            setIsloading(false);
            alert('Game stats Updated successfully');

        } catch (e) {
            console.error(e);
        }
    };
    return (<S.ButtonWrapper
        // disabled={disabled}
        type="button"
        onClick={handleSubmit}
        // loading={isLoading}
        fullWidth
    >
       Save Game Settings
    </S.ButtonWrapper>);

};
