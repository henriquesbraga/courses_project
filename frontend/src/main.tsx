import { ThemeProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import appTheme from './config/appTheme'
import Router from './router'
import { UserDataContext } from './context/user-context'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors position='bottom-center' />
    <ThemeProvider theme={appTheme}>
      <UserDataContext>
        <Router />
      </UserDataContext>
    </ThemeProvider>
  </StrictMode>,
)
