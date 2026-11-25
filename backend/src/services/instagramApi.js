const GRAPH_API_VERSION = 'v27.0';

// Make an authenticated Instagram API request
const makeInstagramRequest = async (endpoint, accessToken, params = {}, method = 'GET') => {
  if (!accessToken) {
    throw new Error('Instagram access token is missing.');
  }

  const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${endpoint}`);

  const requestOptions = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  if (method === 'GET') {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  } else {
    requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    requestOptions.body = new URLSearchParams(params);
  }

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error?.message || 'Instagram API request failed.');
  }

  return data;
};

// Get Instagram profile
const getInstagramProfile = async (accountId, accessToken) => {
  if (!accountId) {
    throw new Error('Instagram account ID is missing.');
  }

  return makeInstagramRequest(accountId, accessToken, {
    fields: 'id,username,name,biography,website,followers_count,media_count'
  });
};

// Get Instagram media
const getInstagramMedia = async (accountId, accessToken) => {
  if (!accountId) {
    throw new Error('Instagram account ID is missing.');
  }

  return makeInstagramRequest(`${accountId}/media`, accessToken, {
    fields: 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url'
  });
};

// Create an image media container
const createInstagramMedia = async (accountId, accessToken, imageUrl, caption) => {
  if (!accountId) {
    throw new Error('Instagram account ID is missing.');
  }

  return makeInstagramRequest(
    `${accountId}/media`,
    accessToken,
    {
      image_url: imageUrl,
      caption
    },
    'POST'
  );
};

// Publish a previously created media container
const publishInstagramMedia = async (accountId, accessToken, creationId) => {
  if (!accountId) {
    throw new Error('Instagram account ID is missing.');
  }

  return makeInstagramRequest(
    `${accountId}/media_publish`,
    accessToken,
    {
      creation_id: creationId
    },
    'POST'
  );
};

// Check Instagram media container status
const getInstagramMediaStatus = async (containerId, accessToken) => {
  return makeInstagramRequest(containerId, accessToken, {
    fields: 'id,status_code,status'
  });
};

module.exports = {
  getInstagramProfile,
  getInstagramMedia,
  createInstagramMedia,
  publishInstagramMedia,
  getInstagramMediaStatus
};
