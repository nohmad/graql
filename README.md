## Graql

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
