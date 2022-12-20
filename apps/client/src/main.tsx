// External dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Internal dependencies
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '$src/utils/env';
import Routes from './routes';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
		<Auth0Provider
			domain={AUTH0_DOMAIN}
			clientId={AUTH0_CLIENT_ID}
			redirectUri={window.location.origin}
			cacheLocation="localstorage"
			scope="openid profile email"
		>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</Auth0Provider>
	</React.StrictMode>
);
