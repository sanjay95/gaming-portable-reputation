import { FC, useState, useEffect } from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import axios from 'axios';
import * as S from '../Games.styled';
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication';
import {  hasPreferenceVC } from '../index.page';
import { Preferences } from 'types/vc';

export const Export: FC<{ preferences: Preferences; }> = ({ preferences }) => {
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
        <ExportButton preferences={preferences} setShowExport={setShowExport} />
    );
};
const ExportButton: FC<{
    preferences: Preferences;
    setShowExport: (showExport: boolean) => void;
}> = ({ preferences, setShowExport }) => {

    const handleSubmit = async (e: any) => {
        try {
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
