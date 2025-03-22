const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5001;

// Enable CORS to allow frontend to connect to backend
app.use(cors());
app.use(express.json()); // Parse JSON body

// Open or create SQLite database
const db = new sqlite3.Database('./project_briefs.db', (err) => {
  if (err) {
    console.error('Failed to open the database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create table for project briefs if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS project_briefs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    techStack TEXT NOT NULL,
    goals TEXT NOT NULL
  );
`);

// Route to save project brief data
app.post('/api/project-brief', (req, res) => {
  const { title, description, techStack, goals } = req.body;
  
  const goalsArray = goals.join("\n"); // Convert goals array into a string
  
  const sql = `
    INSERT INTO project_briefs (title, description, techStack, goals)
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(sql, [title, description, techStack, goalsArray], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({
      message: "Project brief saved successfully!",
      data: { title, description, techStack, goals },
      id: this.lastID
    });
  });
});

// Route to get all project briefs
app.get('/api/project-brief', (req, res) => {
  const sql = 'SELECT * FROM project_briefs';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({
      message: "Project briefs fetched successfully!",
      data: rows,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
