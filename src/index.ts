import { print } from 'graphql';
import gql from 'graphql-tag';
import { GraphQLModule } from '@graphql-modules/core';
import express = require('express');
import graphqlHTTP = require('express-graphql');

const app = express();

const MODULES = 40;

const AppModule = new Array(MODULES)
  .fill(0)
  .reduce<GraphQLModule>(
    (acc, _value, index) => {
      const name = `Module${index}`;
      console.log(name);

      return new GraphQLModule({
        name,
        typeDefs: gql`
        type Query {
          test: Boolean @access(roles: ["Admin"])
        }
      `,
        imports: [
          acc
        ],
      })
    },
    new GraphQLModule({
      name: 'AuthModule',
      typeDefs: gql`
        directive @access(roles: [String]) on FIELD_DEFINITION
      `,
    })
  );

console.log(print(AppModule.typeDefs));

app.use('/graphql', graphqlHTTP({
  schema: AppModule.schema,
}))

app.listen(
  4000,
  () => {
    console.log('service is started on port 4000')
  }
);
