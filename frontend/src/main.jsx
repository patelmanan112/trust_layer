import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import { store } from './store'
import './index.css'

const GOOGLE_CLIENT_ID = "662681241527-u2uc7tvbjfam970hvrjms8ht2sm8ti86.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <HelmetProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </HelmetProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
