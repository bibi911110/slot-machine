const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
require('dotenv').config();
const { authCheckMiddleware } = require('./helpers/auth');
const cors = require('cors');
const bodyParser = require('body-parser');


// express server
const app = express();

//db
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: require,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Error', error);
    }
};

// execute databse connection
db();

// middlewares
app.use(cors());
app.use(bodyParser.json({kimit: '5mb'}));

// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));
// resolvers
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

// applyMiddleware method connects ApolloServer to a specific
// HTTP frameworl i.e Express
apolloServer.applyMiddleware({ app });

// server
const httpserver = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpserver);

// rest endpoint

// port
httpserver.listen(process.env.PORT, function() {
    console.log(`server is ready at http://localhost:${process.env.PORT}`);
    console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
    console.log(`subscription is ready at http://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`);
});
