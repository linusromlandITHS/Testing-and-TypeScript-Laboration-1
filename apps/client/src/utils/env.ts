const AUTH0_DOMAIN: string = import.meta.env.PUB_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID: string = import.meta.env.PUB_AUTH0_CLIENT_ID;
const API_URL: string = import.meta.env.PUB_API_URL || 'http://127.0.0.1:3001';

export { AUTH0_DOMAIN, AUTH0_CLIENT_ID, API_URL };
