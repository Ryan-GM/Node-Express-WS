const express = require('express'); // Import express
const app = express(); // Create an instance of express

app.use(express.json()); // Middleware to parse JSON bodies

// Basic GET route
app.get('/error', (req, res, next) => { // Define a GET route
    // res.send('Hello World!'); // Send a response
    next(new Error('Sim'));
});

// Basic POST route
app.post('/data', (req, res) => { // Define a POST route
    res.send('Data received!'); // Send a response
});

// Basic PUT route
app.put('/data/:id', (req, res) => { // Define a PUT route
    res.send(`Data with ID ${req.params.id} updated!`); // Send a response
});

// Basic DELETE route
app.delete('/data/:id', (req, res) => { // Define a DELETE route
    res.send(`Data with ID ${req.params.id} deleted!`); // Send a response
});

// Basic PATCH route
app.patch('/data/:id', (req, res) => { // Define a PATCH route
    res.send(`Data with ID ${req.params.id} partially updated!`); // Send a response
});

// Error handling middleware
app.use((err, req, res, next) => { // Middleware for error handling
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something broke!'); // Send a 500 response
});

// 404 handler
app.use((req, res) => { // Middleware for 404 handling
    res.status(404).send('Not Found'); // Send a 404 response
});

const PORT = process.env.PORT || 3000; // Set the port
app.listen(PORT, () => { // Start the server
    console.log(`Server is running on port ${PORT}`); // Log the server status
});