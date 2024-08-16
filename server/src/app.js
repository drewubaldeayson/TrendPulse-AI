const express = require("express");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieparser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
