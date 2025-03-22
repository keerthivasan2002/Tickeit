const sqlite3 = require('better-sqlite3')('database.db')
const db = new sqlite3.Database('./project.db');

// Insert Project Brief
function insertProjectBrief(title, description, techStack, goals, callback) {
    db.run("INSERT INTO project_brief (title, description) VALUES (?, ?)", [title, description], function (err) {
        if (err) return callback(err);
        
        const projectId = this.lastID;

        // Insert Tech Stack
        techStack.forEach(tech => {
            db.run("INSERT INTO tech_stack (project_id, tech_name) VALUES (?, ?)", [projectId, tech]);
        });

        // Insert Goals
        goals.forEach(goal => {
            db.run("INSERT INTO goals (project_id, goal) VALUES (?, ?)", [projectId, goal]);
        });

        callback(null, { projectId });
    });
}

// Insert Team Member
function insertTeamMember(id, name, role, callback) {
    db.run("INSERT INTO team_members (id, name, role) VALUES (?, ?, ?)", [id, name, role], callback);
}

// Get Project Brief
function getProjectBrief(callback) {
    db.all("SELECT * FROM project_brief", [], (err, projects) => {
        if (err) return callback(err);
        callback(null, projects);
    });
}

module.exports = { insertProjectBrief, insertTeamMember, getProjectBrief };