[![Coverage Status](https://coveralls.io/repos/github/nohmad/graql/badge.svg)](https://coveralls.io/github/nohmad/graql)

# Graql

graql is a light-weight graphql client depends on nothing but 'node-fetch'.

```
const {Graql} = require('graql');
const query = `
query MyGraphQuery($id: Int) {
  foobar(where: {id: {_eq: $id}}) {
    id name description
  }
}
`;
const client = new Graql('https://acme.com/graphql');
const result = await client.fetch({query, variables: {id: 1}});
console.log(result.data.foobar);
```

## Customize fetch options

graql sets two default headers:

  * `content-type`: `application/json`
  * `accept`: `application/json`

You can add any header as you want without corrupting these default headers.

```
const client = new Graql(endpoint, {headers: {'x-user-agent': 'myapp'}});
client.fetch({query, variables}, {headers: {'accept': '*/*'}});
```

The headers set by argument to constructor is not corrupted by the argument to `fetch`.

## Debug

If you set `debug: true`, then it prints out `curl` command to `console.log`.

```
const client = new Graql(endpoint, {debug: true});
```
