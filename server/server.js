const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json()); // Add this to parse JSON body
app.use(express.urlencoded({ extended: true })); // For form data support

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies


// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Read data from db.json
const getData = () => {
    const data = fs.readFileSync("db.json");
    return JSON.parse(data);
};

// GET all data
app.get("/api", (req, res) => {
    const data = getData();
    res.json(data);
});

// GET a specific resource (e.g., /api/books)
app.get("/api/:resource", (req, res) => {
    const data = getData();
    const resource = req.params.resource;
    res.json(data[resource] || []);
});

app.post("/api/:resource", (req, res) => {
    const data = getData(); 
    const resource = req.params.resource;
    
    if (!data[resource]) data[resource] = [];

    const newItem = req.body;
    newItem.id = Date.now(); // Generate unique ID
    data[resource].push(newItem);

    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    res.status(201).json(newItem);
});


// DELETE: Remove data
app.delete("/api/:resource/:id", (req, res) => {
    const data = getData();
    const resource = req.params.resource;
    const id = Number(req.params.id);

    if (!data[resource]) return res.status(404).json({ error: "Resource not found" });

    data[resource] = data[resource].filter(item => item.id !== id);
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    res.json({ message: "Deleted successfully" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
