/** Включает мок API: все запросы остаются локальными, бекенд не нужен. */
export const isApiMockEnabled = () => {
  const flag = process.env.REACT_APP_API_MOCK;
  if (flag === 'true' || flag === '1') return true;
  if (!process.env.REACT_APP_API_URL) return true;
  return false;
};

export const MOCK_ADMIN_EMAIL =
  process.env.REACT_APP_MOCK_ADMIN_EMAIL || 'admin@0xcoin.local';

export const MOCK_ADMIN_PASSWORD =
  process.env.REACT_APP_MOCK_ADMIN_PASSWORD || 'admin123';

export const MOCK_ACCESS_TOKEN =
  process.env.REACT_APP_MOCK_ACCESS_TOKEN || 'mock-jwt-0xcoin-local-dev';
