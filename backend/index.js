require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

const connectToMongo = require('./db');
connectToMongo();

//Using middlewares
app.use(cors());
app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`iNoteBook is listening on port http://localhost:${port}`);
});