import fetch from 'node-fetch';

const APPLICATION_JSON = 'application/json';

interface Options {
  method?: string,
  headers?: {[key: string]: string},
  body?: string,
  debug?: boolean,
};

interface GraphqlRequest {
  query: string,
  variables?: any,
};

class Graql {
  endpoint: string;
  headers: {[key: string]: string};
  debug: boolean;
  options: Options;

  constructor(endpoint: string, options: Options = {debug: false}) {
    this.endpoint = endpoint;
    this.debug = options.debug;
    delete options.debug;
    this.headers = {
      'accept': APPLICATION_JSON,
      'content-type': APPLICATION_JSON,
      ...options.headers,
    };
    this.options = {method: 'POST', ...options};
  }

  async fetch(request: GraphqlRequest, options: Options = {}) {
    const body = JSON.stringify(request);
    const headers = {...this.headers, ...options.headers};
    const _options = {...this.options, ...options, headers};
    if (this.debug) {
      const _headers = Object.entries(headers).map(([k, v]) => `-H '${k}: ${v}'`).join(' ');
      console.log(`curl -X ${_options.method} ${_headers} -d '${body}' ${this.endpoint}`);
    }
    const response = await fetch(this.endpoint, {..._options, body});
    if (!response.ok) {
      if (this.debug) {
        console.error(response);
      }
      throw new Error(`Failed to fetch from ${this.endpoint}: ${body}`);
    }
    return await response.json();
  }
}

export {Graql};