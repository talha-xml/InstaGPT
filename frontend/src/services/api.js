const API_BASE_URL = 'http://10.215.161.110:5000';

export async function checkBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);

    if (!response.ok) {
      throw new Error('Backend request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Backend connection error:', error.message);
    throw error;
  }
}

export async function openInstagramBrowser() {
  const response = await fetch(`${API_BASE_URL}/api/instagram/browser/start`, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Could not open Instagram browser');
  }

  return await response.json();
}

export async function closeInstagramBrowser() {
  const response = await fetch(`${API_BASE_URL}/api/instagram/browser/close`, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Could not close Instagram browser');
  }

  return await response.json();
}
