import express from "express";
import path from "path";

const app = express()
const port = 3000

app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`E-shop listening on port: ${port}`);
})
