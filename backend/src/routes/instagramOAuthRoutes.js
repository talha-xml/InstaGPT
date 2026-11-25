const express = require('express');
const crypto = require('crypto');

const authMiddleware = require('../middleware/authMiddleware');

const {
  generateInstagramLoginUrl,
  exchangeInstagramCode,
  verifyInstagramToken,
  getAuthorizedInstagramAccounts
} = require('../services/instagramOAuthService');

const { consumeValidOAuthState } = require('../repositories/instagramOAuthRepository');
const { createInstagramAccount } = require('../repositories/instagramAccountRepository');
const { encryptToken } = require('../utils/tokenEncryption');

const router = express.Router();

// Start Instagram OAuth (requires an authenticated InstaGPT user)
router.get('/start', authMiddleware, async (req, res) => {
  try {
    const loginUrl = await generateInstagramLoginUrl(req.user.id);

    res.json({
      status: 'success',
      message: 'Instagram login URL generated successfully.',
      loginUrl
    });
  } catch (error) {
    console.error('Instagram OAuth start error:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Unable to start Instagram authentication.'
    });
  }
});

// Meta redirects here after the user completes login
router.get('/callback', async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (!state || typeof state !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid OAuth state.'
      });
    }

    // Hash the returned state before checking the database
    const stateHash = crypto.createHash('sha256').update(state).digest('hex');

    // Atomically validate and consume the state
    const oauthState = await consumeValidOAuthState(stateHash);

    if (!oauthState) {
      return res.status(400).json({
        status: 'error',
        message: 'OAuth state is invalid, expired, or already used.'
      });
    }

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Instagram authorization was not completed.'
      });
    }

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Instagram authorization code is missing.'
      });
    }

    // Exchange authorization code for an access token
    const tokenData = await exchangeInstagramCode(code);

    // Verify the returned token with Meta
    const tokenInfo = await verifyInstagramToken(tokenData.accessToken);

    if (!tokenInfo.isValid || tokenInfo.appId !== process.env.META_APP_ID) {
      throw new Error('Instagram token verification failed.');
    }

    if (!tokenInfo.userId) {
      throw new Error('Meta user ID is missing from the verified token.');
    }

    // Discover Instagram accounts assigned through this login
    const accounts = await getAuthorizedInstagramAccounts(tokenData.accessToken, tokenInfo.userId);

    if (!accounts.length) {
      throw new Error('No authorized Instagram accounts were returned by Meta.');
    }

    // Encrypt the token before storing it
    const encryptedAccessToken = encryptToken(tokenData.accessToken);

    // Meta reports 0 when the token has no expiry
    const tokenExpiresAt = tokenInfo.expiresAt ? new Date(tokenInfo.expiresAt * 1000) : null;

    // Save each authorized Instagram account for this InstaGPT user
    const savedAccounts = [];

    for (const account of accounts) {
      const savedAccount = await createInstagramAccount({
        userId: oauthState.user_id,
        instagramUserId: account.instagramUserId,
        username: account.username,
        accountType: account.accountType,
        encryptedAccessToken,
        tokenExpiresAt
      });

      savedAccounts.push(savedAccount);
    }

    // Log safe metadata only
    console.log('Instagram account connection successful.');
    console.log('InstaGPT user ID:', oauthState.user_id);
    console.log('Connected Instagram accounts:', savedAccounts.length);
    console.log('Token type:', tokenInfo.tokenType);
    console.log('Token expiry:', tokenInfo.expiresAt);

    // Never expose the access token to the browser
    return res.json({
      status: 'success',
      message: 'Instagram account connected and saved successfully.',
      accounts: savedAccounts.map((account) => ({
        id: account.id,
        instagramUserId: account.instagram_user_id,
        username: account.username,
        accountType: account.account_type,
        connectionStatus: account.connection_status
      })),
      token: {
        valid: tokenInfo.isValid,
        type: tokenInfo.tokenType,
        expiresAt: tokenInfo.expiresAt,
        permissions: tokenInfo.scopes
      }
    });
  } catch (error) {
    console.error('Instagram OAuth callback error:', error.message);

    return res.status(500).json({
      status: 'error',
      message: 'Instagram authentication could not be completed.'
    });
  }
});

module.exports = router;
