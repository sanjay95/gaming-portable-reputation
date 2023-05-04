import { FC, useState, useEffect } from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import axios from 'axios';
import * as S from '../Games.styled';
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication';
import { Preferences } from '../index.page';
import { hasPreferenceVC } from 'pages/Games/tokenOperations';

export const SaveGamePreferences: FC<{ preferences: Preferences;
    setIsloading: (setIsloading: boolean) => void;
 }> = ({ preferences,setIsloading }) => {
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
            >
                Please sign in to save your settings..
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
        <ExportButton preferences={preferences} setShowExport={setShowExport}  setIsloading={setIsloading} />
    );
};
const ExportButton: FC<{
    preferences: Preferences;
    setShowExport: (showExport: boolean) => void;
    setIsloading: (setIsloading: boolean) => void;
}> = ({ preferences, setShowExport,setIsloading }) => {

    const handleSubmit = async (e: any) => {
        try {
            setIsloading(true);
            e.preventDefault();
            const headers = createCloudWalletAuthenticationHeaders();
            if (preferences.vcId) {
                const response = await axios(
                    `/api/cloud-wallet/delete-vc`,
                    {
                        method: "POST",
                        headers,
                        data: { vcId: preferences.vcId },
                    }
                );
                console.log('delete result', response);
            }

            delete preferences['vcId'];
            console.log('########', preferences);
            const response = await axios(
                `/api/game/export-preferences`,
                {
                    method: "POST",
                    headers,
                    data: preferences,
                }
            );

            setShowExport(false);
            setIsloading(false);
            const wind = window as any;
            if (wind.Game && wind.Pong) {
                wind.Game.start("game", wind.Pong, {
                    sound: false,
                    stats: true,
                    footprints: true,
                    predictions: true,
                });
            }
            alert('Preference Updated successfully');

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
        Update Settings
    </S.ButtonWrapper>);

};
