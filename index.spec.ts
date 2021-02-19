import * as _fetch from 'node-fetch';
import { Graql } from './index';

jest.mock('node-fetch');
const fetch = _fetch as any;

jest.spyOn(global.console, 'log').mockImplementation(jest.fn());

beforeEach(() => {
  fetch.mockReset();
});

const ENDPOINT = 'http://localhost:1234/graphql';

describe("Graql", () => {  
  it("invokes fetch with default arguments", async () => {
    const client = new Graql(ENDPOINT);
    const query = 'QUERY', variables = {x: 1};
    fetch.mockResolvedValue({ok: true, json: jest.fn(() => Promise.resolve({}))} as any);

    await client.fetch({query, variables});

    expect(fetch).toHaveBeenCalled();
    const [endpoint, options] = fetch.mock.calls[0];
    expect(endpoint).toEqual(ENDPOINT);
    expect(JSON.parse((options.body as any))).toEqual({query, variables});
  });

  it("throws Error if response is not ok", async () => {
    const client = new Graql(ENDPOINT);
    fetch.mockResolvedValue({ok: false} as any);

    await expect(client.fetch({query: ""})).rejects.toThrow(Error);
  });

  it("writes request log to console if debug is set", async () => {
    const client = new Graql(ENDPOINT, {debug: true, headers: {'x-user-agent': 'graql-client'}});
    fetch.mockResolvedValue({ok: true, json: jest.fn(() => Promise.resolve({}))} as any);

    await client.fetch({query: ""});

    expect(console.log).toHaveBeenCalled();
  });
});