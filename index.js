const express = require ("express");
const cors = require ("cors");
const NoteRoute = require ("./routes/NoteRoute.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(NoteRoute);

app.listen(5000, () => console.log("Server connected"));
