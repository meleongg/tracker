const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// enables process.env to get env variables from .env file
require('dotenv').config();

const app = express();
// looks for specific port in .env or 5000 localhost
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;

// useNewUrlParser is an option that wards off a deprecation warning that parses MongoDB connection string in .env
// useCreateIndex instead of ensureIndex (deprecated) 
// creates a default connection 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
// access connection that is created from above
const connection = mongoose.connection;

// will run the first time the connection is opened i.e open event -> event listener & callback func
connection.once('open', () => {
    console.log("mongoDB database connection established successfully");
});

// grab code from the two route locations
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// load the routers from other files
// app.use to setup middleware paths
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// binds and listens for connections from specified port
// the code that starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});