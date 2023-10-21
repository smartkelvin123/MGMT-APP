const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const colors = require("colors");
const connectDB = require("./config/db");

require("dotenv").config();
const app = express();

// connect to datebase
connectDB();

const port = process.env.PORT || 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // graphiql: process.env.NODE_ENV === "development",
    graphiql: true,
  })
);

app.use(express.json());
console.log(`Server listening on ${port}`.cyan.underline.bold);
