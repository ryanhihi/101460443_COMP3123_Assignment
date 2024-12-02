const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const DB_URL = "mongodb+srv://willbluemoon99:EmCK6UKBZx7vVQJm@ryan.nz0hm.mongodb.net/?retryWrites=true&w=majority&appName=Ryan"; 

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to the MongoDB Atlas server');
})
.catch(err => {
    console.error('Database connection error:', err);
    process.exit();
});

//Route for testing
app.get('/', async (req, res) => {
    res.send("<h1>Assignment 1 Comp3123 Ryan Tran _ 101460443</h1>");


});

// Use user routes
app.use('/api/v1/user', userRoutes);

// Use employee routes
app.use('/api/v1/emp', employeeRoutes);


// Start the server
app.listen(8082, () => {
    console.log("Server is listening on port 8082");
});
