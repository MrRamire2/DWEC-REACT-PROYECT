import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FirebaseAppProvider } from 'reactfire' // problemas con el import
import './index.css'
import App from './App.jsx'
import { firebaseConfig } from './firebaseConfig'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </StrictMode>,
)
