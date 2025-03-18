const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vinay@123",
    database: "bms"
});

connection.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


// GET all data related to books
app.get("/api/books", (req, res) => {
    connection.query(`
        SELECT 
    b.title, 
    b.pubDate, 
    b.genre, 
    b.price,
    b.isbn,
    a.author
FROM 
    books b
JOIN 
    author a ON b.author_id = a.author_id;
    `, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log('get request result',results);
        res.json(results);
    });
});



// POST: Insert a new record
app.post("/api/books", (req, res) => {
    const newData = req.body;
    const { author, title, isbn, price, pubDate, genre } = newData;

    // Insert author into author table
    connection.query(`INSERT INTO author (author, isbn) VALUES (?, ?)`, [author, isbn], (err, authorResults) => {
        if (err) return res.status(500).json({ error: err.message });

        const author_id = authorResults.insertId;

        // Insert book into books table
        connection.query(`INSERT INTO books (title, isbn, price, pubDate, genre, author_id) VALUES (?, ?, ?, ?, ?, ?)`, 
        [title, isbn, price, pubDate, genre, author_id], (err, bookResults) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: bookResults.insertId, ...newData });
        });
    });
});

// DELETE: Remove a record by ID
app.delete("/api/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    connection.query(`DELETE FROM books WHERE isbn = ?`, [isbn], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Record not found" });
        res.json({ message: "Deleted successfully" });
    });
});
   

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
