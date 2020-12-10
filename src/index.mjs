import fetch, {Headers} from 'node-fetch';

const APPLICATION_JSON = 'application/json';

class Graql {
  constructor(endpoint, headers) {
    this.endpoint = endpoint;
    this.headers = new Headers({
      'accept': APPLICATION_JSON,
      'content-type': APPLICATION_JSON,
      ...headers
    });
  }

  async fetch(query, options = {}) {
    if (options.method === undefined) {
      Object.assign(options, {method: 'POST'});
    }
    const body = JSON.stringify(query);
    const response = await fetch(this.endpoint, {...options, headers: this.headers, body});
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${query}`);
    }
    return await response.json();
  }
}

export {Graql};