import { getToken } from '../utils/token/token';
import { isApiMockEnabled } from '../config/apiMock.config';
import { tryMockRequest } from '../mocks/backendMock';

const convertToQueryParams = (params = {}) => {
  let queryString = '';
  Object.keys(params).forEach((key, index) => {
    if (index === 0) queryString += `?${key}=${params[key]}`;
    else queryString += `&${key}=${params[key]}`;
  });
  return queryString;
};

export const GET = (url = '', params = {}) => {
  return new Promise((resolve, reject) => {
    const token = getToken();
    const fullUrl = url + convertToQueryParams(params);

    tryMockRequest('GET', fullUrl, null)
      .then((mocked) => {
        if (mocked) {
          resolve(mocked);
          return;
        }
        if (isApiMockEnabled()) {
          reject(new Error(`API mock: нет обработчика для GET ${fullUrl}`));
          return;
        }
        runFetch();
      })
      .catch(reject);

    function runFetch() {
      const fetchUrl = fullUrl;
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'A-Auth-Token': token,
        },
      };
      fetch(fetchUrl, options)
        .then(async (response) => {
          if (response.status === 418) {
            reject(new Error(response.status));
          }
          if (!response.ok) {
            reject(new Error(`${response.statusText}\n${fetchUrl}`));
          }

          const data = await response.json();
          resolve({ data });
        })
        .catch((e) => {
          reject(new Error(`${e.message}\n${fetchUrl}`));
        });
    }
  });
};

export const POST = (url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    const token = getToken();

    tryMockRequest('POST', url, data)
      .then((mocked) => {
        if (mocked) {
          resolve(mocked);
          return;
        }
        if (isApiMockEnabled()) {
          reject(new Error(`API mock: нет обработчика для POST ${url}`));
          return;
        }
        runFetch();
      })
      .catch(reject);

    function runFetch() {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'A-Auth-Token': token,
        },
        body: JSON.stringify(data),
      };

      fetch(url, options)
        .then(async (response) => {
          if (response.status === 418) {
            reject(new Error(response.status));
          }
          const data = await response.json();
          if (!response.ok) {
            reject(
              new Error(`${response.statusText}\n${url}\n${JSON.stringify(data)}`)
            );
          }

          resolve({ data });
        })
        .catch((e) => {
          reject(new Error(`${e.message}\n${url}`));
        });
    }
  });
};

export const PUT = async (url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    const token = getToken();

    tryMockRequest('PUT', url, data)
      .then((mocked) => {
        if (mocked) {
          resolve(mocked);
          return;
        }
        if (isApiMockEnabled()) {
          reject(new Error(`API mock: нет обработчика для PUT ${url}`));
          return;
        }
        runFetch();
      })
      .catch(reject);

    function runFetch() {
      const options = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'A-Auth-Token': token,
        },
        body: JSON.stringify(data),
      };
      fetch(url, options)
        .then(async (response) => {
          if (response.status === 418) {
            reject(new Error(response.status));
          }
          const data = await response.json();
          resolve({ data });
        })
        .catch((e) => {
          reject(new Error(e.message));
        });
    }
  });
};
