import { getToken } from '../utils/token/token';

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
    url += convertToQueryParams(params);
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'A-Auth-Token': token,
      },
    };
    fetch(url, options)
      .then(async (response) => {
        if (response.status === 418) {
          reject(new Error(response.status));
        }
        if (!response.ok) {
          reject(new Error(`${response.statusText}\n${url}`));
        }

        const data = await response.json();
        resolve({ data });
      })
      .catch((e) => {
        reject(new Error(`${e.message}\n${url}`));
      });
  });
};

export const POST = (url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    const token = getToken();
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
  });
};

export const PUT = async (url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    const token = getToken();
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
  });
};
