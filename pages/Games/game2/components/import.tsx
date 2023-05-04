import { FC, useState, useEffect } from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import Link from 'next/link';
import { ROUTES } from 'utils';
import  { Preferences, hasPreferenceVC }  from '../index.page';
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication';
import axios from 'axios';

export const ImportButton: FC<{
    setPreferences: (preferences: Preferences) => void
}> = ({ setPreferences }) => {
    const handleSubmit = async () => {
        try {
            const response = await axios(
                '/api/game/get-preferences',
                {
                    method: 'GET',
                    headers: createCloudWalletAuthenticationHeaders(),
                }
            )

            setPreferences(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    return <button onClick={handleSubmit}>Import Preferences...</button>
}

export const Import: FC<{ setPreferences: (preferences: Preferences) => void; }> = ({
    setPreferences,
}) => {
    const { authState, setAuthState } = useAuthContext();
    const [showImport, setShowImport] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const hasPreferences: boolean = await hasPreferenceVC();
            setShowImport(hasPreferences);
            setLoading(false);
        })();
    }, []);

    if (!authState.authorized) {
        return (
            <Link href={ROUTES.singIn} style={{
                boxSizing: "border-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "23px",
                fontSize: "15px",
                display: "inline-block",
            }}>
                Login With Affinidi Game wallet to sync preferences
            </Link>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (!showImport) {
    //     return (<><div>No preferences found in your Cloud Wallet!</div><div> set now </div></>
    //     );
    // }

    return <ImportButton setPreferences={setPreferences} />;
};
