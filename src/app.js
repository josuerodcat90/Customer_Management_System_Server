import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';

///Merge TypeDefs and Resolvers from graphql folder
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, '/graphql/schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, '/graphql/resolvers')));

const app = express();

///app settings
app.set('PORT', process.env.PORT || 4000);

///Middlewares
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});
server.applyMiddleware({ app });

///export app
module.exports = app;
