import fetch from 'node-fetch';
const {Headers} = fetch;

class Graql {
  constructor(endpoint, headers) {
    this.endpoint = endpoint;
    this.headers = new Headers({
      'accept': 'application/json',
      'content-type': 'application/json',
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