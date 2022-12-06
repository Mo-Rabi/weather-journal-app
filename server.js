// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors({}));

// Initialize the main project folder
app.use(express.static('website'));

// Server set up
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

// Require express to run routes and server
// get data
app.get ('/getData', (req, res ) => {
    res.send(projectData);
});

//send data 
app.post ('/sendData', (req, res) => {
    projectData =req.body;
    res.send("Sending data was completed successfully")
});
