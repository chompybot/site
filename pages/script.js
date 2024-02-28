const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/submit-comment", (req, res) => {
    const { name, comment } = req.body;

    // Save the comment to the database (e.g., MongoDB, MySQL, SQLite)

    // Send a response back to the client
    res.send("Comment submitted successfully!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});