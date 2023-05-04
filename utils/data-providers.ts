import { signIn } from 'next-auth/react';
import { hostUrl } from 'pages/env';

export enum DataProvider {
  BATTLE_NET = 'battleNet',
  studio = 'gamingStudio',
  // XBOX='xbox'
}

export const dataProviders = [DataProvider.BATTLE_NET, DataProvider.studio];

export const dataProviderVcTypes = {
  [DataProvider.BATTLE_NET]: 'BattleNetProfile',
  [DataProvider.studio]: 'AffinidiStudioProfileVC',
};

export const DATA_PROVIDER_ROUTES = {
  battleNet: '/data-providers/battle-net',
  battleNetCallback: '/data-providers/battle-net/callback',
  gamingStudio: '/',
  gamingStudioCallback: '/',
};

export const initiateDataImport = async (provider: DataProvider) => {
  if (provider === DataProvider.BATTLE_NET) {
    await signIn('battlenet', {
      callbackUrl: `${hostUrl}${DATA_PROVIDER_ROUTES.battleNetCallback}`,
    });
  } else {
    throw new Error(`Unknown data provider: ${provider}`);
  }
};
