const express = require("express");
const path = require("path");

const app = express();

console.log(path.resolve(__dirname, "src"));
app.use(
  "/static",
  express.static(path.resolve(__dirname, "src"), {
    extensions: ["js", "css"],
  })
);

const port = 8081;

// app.use(express.json());
app.get("/photoCat", (req, res) => {
  res.sendFile(path.resolve("./src/photoCat", "./index.html"));
});

app.listen(port, () => console.log(`Server is running port :: ${port}`));
