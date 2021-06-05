  
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Auth0Provider } from "@auth0/auth0-react";

// TODO: wrap everything in Auth0
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin} //copied from class repo
    >
      <App />
    </Auth0Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);