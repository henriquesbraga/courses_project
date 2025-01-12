import { ThemeProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import appTheme from './config/appTheme'
import Router from './router'
import { UserDataContext } from './context/user-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <UserDataContext>
        <Router />
      </UserDataContext>
    </ThemeProvider>
  </StrictMode>,
)
