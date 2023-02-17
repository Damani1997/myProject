import express from "express";
import cors from "cors";
import config from "getconfig";
import userRoute from "./routes/user.routes";

// require('dotenv').config();

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());


const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('src/swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// parse requests of content-type - application/json
app.use(express.json({ limit: "150mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

import db from "./models";

/*  db.mongoose.connect(
 config.mongoDB
); */
db.mongoose
  .connect(config.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Niteshkk application." });
});
// app.use('/users',(req, res)=>{
//   res.send("hello");
// });
app.use("/users", userRoute);

//require('./routes/user.routes')(app);
// set port, listen for requests
// const PORT = process.env.PORT || 4020;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

module.exports = app;
