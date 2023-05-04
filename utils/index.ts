import { DATA_PROVIDER_ROUTES } from './data-providers'

export const pxToRem = (px: number) => `${px / 8}rem`

export const ROUTES = {
  profileSetup: '/profile-setup',
  home: '/',
  games: '/#games',
  tournament: '/#tournament',
  news: '/#news',
  contact: '/#contact',
  wallet: '/wallet',
  singIn: '/sign-in',
  confirmSingIn: '/confirm-sign-in',
  scan: {
    root: '/scan',
    result: '/scan/result'
  },
  game1: '/Games/game1',
  game2: '/Games/game2',
  ...DATA_PROVIDER_ROUTES,
}
