const crypto = require('crypto');

const { createOAuthState } = require('../repositories/instagramOAuthRepository');

// Generate Meta's Instagram Login URL
const generateInstagramLoginUrl = async (userId) => {
  if (!userId) {
    throw new Error('Authenticated user ID is required.');
  }

  const appId = process.env.META_APP_ID;
  const configId = process.env.META_CONFIG_ID;
  const redirectUri = process.env.META_REDIRECT_URI;

  if (!appId || !configId || !redirectUri) {
    throw new Error('Meta OAuth configuration is incomplete.');
  }

  // Generate a cryptographically secure state value
  const state = crypto.randomBytes(32).toString('hex');

  // Store only its SHA-256 hash in the database
  const stateHash = crypto.createHash('sha256').update(state).digest('hex');

  // State expires after 10 minutes
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await createOAuthState(userId, stateHash, expiresAt);

  // Build Meta's Unified Login URL
  const loginUrl = new URL('https://www.facebook.com/dialog/oauth');

  loginUrl.searchParams.set('client_id', appId);
  loginUrl.searchParams.set('config_id', configId);
  loginUrl.searchParams.set('display', 'popup');
  loginUrl.searchParams.set('override_default_response_type', 'true');
  loginUrl.searchParams.set('redirect_uri', redirectUri);
  loginUrl.searchParams.set('response_type', 'code');
  loginUrl.searchParams.set('state', state);
  loginUrl.searchParams.set('prompt', 'login');

  return loginUrl.toString();
};

// Exchange Meta's authorization code for an access token
const exchangeInstagramCode = async (code) => {
  if (!code) {
    throw new Error('Instagram authorization code is missing.');
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const redirectUri = process.env.META_REDIRECT_URI;

  if (!appId || !appSecret || !redirectUri) {
    throw new Error('Meta OAuth configuration is incomplete.');
  }

  const tokenUrl = new URL('https://graph.facebook.com/v27.0/oauth/access_token');

  tokenUrl.searchParams.set('client_id', appId);
  tokenUrl.searchParams.set('client_secret', appSecret);
  tokenUrl.searchParams.set('redirect_uri', redirectUri);
  tokenUrl.searchParams.set('code', code);

  const response = await fetch(tokenUrl);
  const data = await response.json();

  if (!response.ok || data.error || !data.access_token) {
    console.error(
      'Meta token exchange error:',
      data.error?.message || 'Unexpected response from Meta.'
    );

    throw new Error('Unable to exchange Instagram authorization code.');
  }

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in ?? null,
    tokenType: data.token_type ?? null
  };
};

// Verify the token returned by Meta
const verifyInstagramToken = async (accessToken) => {
  if (!accessToken) {
    throw new Error('Access token is required for verification.');
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error('Meta app credentials are missing.');
  }

  const debugUrl = new URL('https://graph.facebook.com/v27.0/debug_token');

  debugUrl.searchParams.set('input_token', accessToken);
  debugUrl.searchParams.set('access_token', `${appId}|${appSecret}`);

  const response = await fetch(debugUrl);
  const result = await response.json();

  if (!response.ok || result.error || !result.data) {
    throw new Error('Meta token verification failed.');
  }

  if (!result.data.is_valid) {
    throw new Error('Meta returned an invalid access token.');
  }

  return {
    isValid: result.data.is_valid,
    appId: result.data.app_id,
    tokenType: result.data.type,
    userId: result.data.user_id,
    expiresAt: result.data.expires_at,
    scopes: result.data.scopes || [],
    granularScopes: result.data.granular_scopes || []
  };
};

// Discover Instagram accounts granted through this login
const getAuthorizedInstagramAccounts = async (accessToken, metaUserId) => {
  if (!accessToken || !metaUserId) {
    throw new Error('Access token or Meta user ID is missing.');
  }

  const url = new URL(
    `https://graph.facebook.com/v27.0/${encodeURIComponent(metaUserId)}/assigned_instagram_accounts`
  );

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const result = await response.json();

  if (!response.ok || result.error) {
    console.error(
      'Instagram account discovery error:',
      result.error?.message || 'Unknown Meta API error.'
    );

    throw new Error('Unable to retrieve authorized Instagram accounts.');
  }

  return (result.data || []).map((account) => ({
    instagramUserId: account.id,
    username: account.username || null,
    accountType: account.account_type || null
  }));
};

module.exports = {
  generateInstagramLoginUrl,
  exchangeInstagramCode,
  verifyInstagramToken,
  getAuthorizedInstagramAccounts
};
