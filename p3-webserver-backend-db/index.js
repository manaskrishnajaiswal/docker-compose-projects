import express from "express";
import "dotenv/config";
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Up and Running." });
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server is Up and Running on Port: ", PORT);
});
