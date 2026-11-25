const { startBrowser, closeBrowser } = require('./src/services/instagramBrowser');
const {
  getInstagramProfile,
  getInstagramMedia,
  createInstagramMedia,
  getInstagramMediaStatus,
  publishInstagramMedia
} = require('./src/services/instagramApi');
const express = require('express');
const cors = require('cors');
const uploadToCloudinary = require('./src/services/cloudinary');
const upload = require('./src/services/mediaUpload');
const fs = require('fs/promises');
require('dotenv').config();
const pool = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const instagramOAuthRoutes = require('./src/routes/instagramOAuthRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');
const {
  findAccountByUserIdAndAccountId
} = require('./src/repositories/instagramAccountRepository');

const { decryptToken } = require('./src/utils/tokenEncryption');

const app = express();

const getUserInstagramAccount = async (req) => {
  const { accountId } = req.query.accountId ? req.query : req.body;

  if (!accountId) {
    throw new Error('Instagram account ID is required.');
  }

  const account = await findAccountByUserIdAndAccountId(req.user.id, accountId);

  if (!account || account.connection_status !== 'connected') {
    throw new Error('Connected Instagram account not found.');
  }

  const accessToken = decryptToken(account.access_token_encrypted);

  return {
    instagramAccountId: account.instagram_user_id,
    accessToken
  };
};

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Instagram OAuth routes
app.use('/api/instagram/oauth', instagramOAuthRoutes);

// Protect Instagram and media endpoints
app.use('/api/instagram', authMiddleware);
app.use('/api/media', authMiddleware);

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'InstaGPT Backend is running!',
    status: 'success'
  });
});

// Test PostgreSQL Connection
app.get('/api/health/database', async (req, res) => {
  try {
    const result = await pool.query('SELECT current_database() AS database, NOW() AS server_time');

    res.json({
      status: 'success',
      message: 'PostgreSQL connected successfully!',
      database: result.rows[0].database,
      serverTime: result.rows[0].server_time
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed.'
    });
  }
});

app.post('/api/instagram/browser/start', async (req, res) => {
  try {
    const result = await startBrowser();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/instagram/browser/close', async (req, res) => {
  try {
    const result = await closeBrowser();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Instagram Profile
app.get('/api/instagram/profile', async (req, res) => {
  try {
    const { accountId } = req.query;

    if (!accountId) {
      return res.status(400).json({
        status: 'error',
        message: 'Instagram account ID is required.'
      });
    }

    const { instagramAccountId, accessToken } = await getUserInstagramAccount(req);
    const profile = await getInstagramProfile(instagramAccountId, accessToken);

    res.json({
      status: 'success',
      message: 'Instagram profile fetched successfully.',
      profile
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get Instagram Media

app.get('/api/instagram/media', async (req, res) => {
  try {
    const { accountId } = req.query;

    if (!accountId) {
      return res.status(400).json({
        status: 'error',
        message: 'Instagram account ID is required.'
      });
    }

    const { instagramAccountId, accessToken } = await getUserInstagramAccount(req);
    const media = await getInstagramMedia(instagramAccountId, accessToken);

    res.json({
      status: 'success',
      message: 'Instagram media fetched successfully.',
      media
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Create Instagram Media Container
app.post('/api/instagram/media/container', async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;

    if (!imageUrl || !caption) {
      return res.status(400).json({
        status: 'error',
        message: 'Image URL and caption are required.'
      });
    }

    const { instagramAccountId, accessToken } = await getUserInstagramAccount(req);
    const container = await createInstagramMedia(
      instagramAccountId,
      accessToken,
      imageUrl,
      caption
    );

    res.status(201).json({
      status: 'success',
      message: 'Instagram media container created successfully.',
      containerId: container.id
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Check Instagram Media Container Status
app.get('/api/instagram/media/container/:containerId', async (req, res) => {
  try {
    const { accountId } = req.query;

    if (!accountId) {
      return res.status(400).json({
        status: 'error',
        message: 'Instagram account ID is required.'
      });
    }

    const { accessToken } = await getUserInstagramAccount(req);
    const status = await getInstagramMediaStatus(req.params.containerId, accessToken);

    res.json({
      status: 'success',
      message: 'Instagram container status fetched.',
      data: status
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Publish Instagram Media
app.post('/api/instagram/media/publish', async (req, res) => {
  try {
    const { containerId } = req.body;

    if (!containerId) {
      return res.status(400).json({
        status: 'error',
        message: 'Container ID is required.'
      });
    }

    const { instagramAccountId, accessToken } = await getUserInstagramAccount(req);
    const result = await publishInstagramMedia(instagramAccountId, accessToken, containerId);
    res.json({
      status: 'success',
      message: 'Instagram post published successfully!',
      mediaId: result.id
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Upload Media to Cloudinary
app.post('/api/media/upload', (req, res) => {
  upload.single('media')(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide an image or video.'
      });
    }

    try {
      const result = await uploadToCloudinary(req.file.path);

      res.status(201).json({
        status: 'success',
        message: 'Media uploaded successfully.',
        filename: req.file.filename,
        mediaType: result.mediaType,
        sizeBytes: req.file.size,
        storage: 'cloudinary',
        mediaUrl: result.mediaUrl,
        publicId: result.publicId
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Media upload failed.',
        details: error.message
      });
    } finally {
      await fs.unlink(req.file.path).catch(() => {});
    }
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`InstaGPT server running on port ${PORT}`);
});
