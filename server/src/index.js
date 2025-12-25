import express from "express";
import cors from "cors";
import translateRoute from "./routes/translation.route.js";

const app = express();

// Enable CORS for all origins (you can restrict it later if needed)
app.use(cors());

// Parse JSON body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/api/translate", translateRoute);

app.listen(5000, () => {
  console.log("App running on port 5000");
});
