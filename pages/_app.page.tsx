import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'

import { theme } from 'utils/theme'
import { AuthProvider } from 'contexts/AuthContext'
import { ToastsContainer } from 'components'

import '../styles/fonts.css'
import '../styles/globals.css'

import AuthRedirect from './components/AuthRedirect/AuthRedirect'
import NavBar from './components/NavBar/NavBar'
import DataProviderErrorNotification from './components/DataProviderErrorNotification/DataProviderErrorNotification'
import NavBarNew from './components/NavBar/NavBarNew'
import NavBarDirectMenu from './components/NavBar/NavBarDirectMenu'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SessionProvider session={session}>
            <AuthRedirect>
              <NavBarDirectMenu />
              <Component {...pageProps} />
            </AuthRedirect>
          </SessionProvider>
        </AuthProvider>
        <DataProviderErrorNotification />
        <ToastsContainer />
      </QueryClientProvider>
      
    </ThemeProvider>
  )
}
