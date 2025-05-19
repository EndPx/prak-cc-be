const express = require ("express");
const cors = require ("cors");
const NoteRoute = require ("./routes/NoteRoute.js");
const UserRoute = require("./routes/UserRoute.js");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());
app.use(NoteRoute);
app.use("/users",UserRoute);

app.listen(5000, () => console.log("Server connected"));
