const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes")

const app = express();
app.use(express.json());
app.use("/api/users",routes);
mongoose
  .connect("mongodb://localhost:27017/socialnetworkDB")
  .then(() =>
    app.listen(
      3001
      //     PORT, () =>
      //   console.log(`App listening at http://localhost:${PORT}`)
    )
  )
  .then(() =>
    console.log("Connected to Social Network DB and listening on PORT")
  );

// app.use("/api", (req, res, next) => {
//     res.send("Test")
// })
