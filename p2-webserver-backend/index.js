import express from "express";
import path from "path";

const PORT = 5000;
const __dirname = process.cwd();
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    mesage: "Server Working fine!!",
  });
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      `Server is Successfully Running, and App is listening on port ` + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
