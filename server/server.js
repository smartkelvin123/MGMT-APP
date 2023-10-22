const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const colors = require("colors");
const connectDB = require("./config/db");

require("dotenv").config();
const app = express();

// connect to datebas



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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.cyan.underline.bold);
});
