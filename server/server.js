const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

require("dotenv").config();
const app = express();

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
app.listen(port, console.log(`server listening on ${port}`));
