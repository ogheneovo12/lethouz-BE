const mongoose = require("mongoose");

export default (app, { dbURL }) =>
  mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => console.log(err));
