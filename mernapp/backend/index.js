const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const mongoDB = require("./db");

const createUserRoute = require("./routes/CreateUser");
const displayDataRoute = require("./routes/DisplayData");
const orderDataRoute = require("./routes/OrderData");

mongoDB();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Header",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.json());
app.use("/api", createUserRoute);
app.use("/api", displayDataRoute);
app.use("/api", orderDataRoute);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT = ${PORT}`);
});
