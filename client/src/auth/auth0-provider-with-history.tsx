import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import * as config from '../../../environment';

const Auth0ProviderWithHistory:React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const domain = config.domain as string;
  const clientId = config.clientId as string;
  const audience = config.audience;

  const onRedirectCallback:(appState: any)=>void = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  }

  return (
    (<Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>)
  );
};

export default Auth0ProviderWithHistory;