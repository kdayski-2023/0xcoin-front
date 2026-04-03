import {
  isApiMockEnabled,
  MOCK_ACCESS_TOKEN,
  MOCK_ADMIN_EMAIL,
  MOCK_ADMIN_PASSWORD,
} from '../config/apiMock.config';

const mockUser = {
  id: 1,
  email: MOCK_ADMIN_EMAIL,
  username: 'Mock Admin',
};

const mockNewsItem = (currency) => ({
  id: `${currency}-1`,
  img: 'https://placehold.co/100x100/1a1a2e/46e203/png?text=News',
  isGrowing: currency === 'BTC',
  price: currency === 'BTC' ? '97234' : '3456',
  date: 'Apr 3, 2026',
  title: `Mock headline (${currency})`,
  source: 'Mock feed (offline)',
  unread: false,
  tags: [{ id: 1, tag: currency }],
});

async function normalizeRequestBody(body) {
  if (body instanceof FormData) {
    const o = {};
    for (const [k, v] of body.entries()) {
      o[k] = v;
    }
    return o;
  }
  if (body == null || body === '') return {};
  if (typeof body === 'object') return body;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return {};
}

function pathFromUrl(url) {
  const s = String(url);
  const noQuery = s.split('?')[0];
  try {
    if (/^https?:\/\//i.test(noQuery)) {
      return new URL(noQuery).pathname;
    }
  } catch {
    /* fall through */
  }
  const i = noQuery.indexOf('/');
  return i >= 0 ? noQuery.slice(i) : noQuery;
}

/**
 * @returns {Promise<{ data: unknown }> | null} null — не мокать, пойти в сеть (в mock-режиме вызовет ошибку)
 */
export async function tryMockRequest(method, url, body) {
  if (!isApiMockEnabled()) return null;

  const path = pathFromUrl(url);

  const match = (p) => path.includes(p);

  if (method === 'GET' && match('/auth/verify')) {
    return { data: { ...mockUser } };
  }

  if (method === 'GET' && match('/auth/refresh')) {
    return { data: { accessToken: MOCK_ACCESS_TOKEN } };
  }

  if (method === 'GET' && match('/content')) {
    return { data: { data: {} } };
  }

  if (method === 'GET' && match('/chat')) {
    return { data: { messages: [] } };
  }

  if (method === 'GET' && path.endsWith('/subscribe')) {
    return {
      data: {
        subscription: null,
        prices: [
          { price: 29 },
          { price: 49 },
          { price: 199 },
          { price: 399 },
        ],
      },
    };
  }

  if (method === 'GET' && match('/admin/news')) {
    const u = String(url);
    const cur =
      new URLSearchParams(u.includes('?') ? u.split('?')[1] : '').get(
        'currency'
      ) || 'BTC';
    return {
      data: {
        news: [mockNewsItem(cur), mockNewsItem(cur === 'BTC' ? 'ETH' : 'BTC')],
      },
    };
  }

  if (method === 'POST' && match('/auth/login')) {
    const creds = await normalizeRequestBody(body);
    const email = (creds.email || '').trim().toLowerCase();
    const password = creds.password || '';
    const ok =
      email === MOCK_ADMIN_EMAIL.toLowerCase() && password === MOCK_ADMIN_PASSWORD;
    if (!ok) {
      throw new Error('Invalid email or password (mock mode)');
    }
    return {
      data: {
        token: MOCK_ACCESS_TOKEN,
        accessToken: MOCK_ACCESS_TOKEN,
        user: { ...mockUser },
      },
    };
  }

  if (method === 'POST' && match('/auth/register')) {
    const fields = await normalizeRequestBody(body);
    return {
      data: {
        token: MOCK_ACCESS_TOKEN,
        accessToken: MOCK_ACCESS_TOKEN,
        user: {
          id: 2,
          email: fields.email || MOCK_ADMIN_EMAIL,
          username: fields.username || 'user',
        },
      },
    };
  }

  if (method === 'POST' && match('/auth/get_recover_link')) {
    return { data: { recoverLink: '#' } };
  }

  if (method === 'POST' && match('/auth/recover')) {
    return { data: { ok: true } };
  }

  if (method === 'POST' && path.endsWith('/subscribe')) {
    return {
      data: {
        subscription: { duration: 30 },
      },
    };
  }

  if (method === 'POST' && match('/support/contact')) {
    return { data: { ok: true } };
  }

  return null;
}
