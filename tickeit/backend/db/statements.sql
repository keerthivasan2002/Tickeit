-- Create tables for project management

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT CHECK(role IN ('frontend', 'backend', 'ai', 'pm', 'designer')) NOT NULL
);

-- Project Brief Table
CREATE TABLE IF NOT EXISTS project_brief (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Tech Stack Table
CREATE TABLE IF NOT EXISTS tech_stack (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    tech_name TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project_brief(id) ON DELETE CASCADE
);

-- Goals Table
CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    goal TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project_brief(id) ON DELETE CASCADE
);

-- Meeting Notes Table
CREATE TABLE IF NOT EXISTS meeting_notes (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    date TEXT NOT NULL
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    assignedUser TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    assignedRole TEXT CHECK(assignedRole IN ('frontend', 'backend', 'ai', 'pm', 'designer')) NOT NULL,
    status TEXT CHECK(status IN ('todo', 'in-progress', 'done')) NOT NULL,
    priority TEXT CHECK(priority IN ('low', 'medium', 'high')) NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (assignedUser) REFERENCES team_members(id) ON DELETE SET NULL
);

/*
-- table for the task given out 
CREATE TABLE Task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignedUser TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    assignedRole TEXT NOT NULL CHECK(assignedRole IN ('frontend', 'backend', 'ai', 'pm', 'designer')),
    status TEXT NOT NULL CHECK(status IN ('todo', 'in-progress', 'done')),
    priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high')),
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (assignedUser) REFERENCES TeamMember(id)
);

--table for projectbrief
CREATE TABLE ProjectBrief (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    techStack TEXT,  -- You can store this as a comma-separated string or as a relation to another table if necessary.
    goals TEXT  -- You can store this as a comma-separated string or use a relation table to normalize it.
);



CREATE TABLE MeetingNote (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    date DATETIME NOT NULL
);

CREATE TABLE TechStack (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE ProjectTechStack (
    projectId INTEGER,
    techStackId INTEGER,
    FOREIGN KEY (projectId) REFERENCES ProjectBrief(id),
    FOREIGN KEY (techStackId) REFERENCES TechStack(id),
    PRIMARY KEY (projectId, techStackId)
);

CREATE TABLE Goal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
);

CREATE TABLE ProjectGoal (
    projectId INTEGER,
    goalId INTEGER,
    FOREIGN KEY (projectId) REFERENCES ProjectBrief(id),
    FOREIGN KEY (goalId) REFERENCES Goal(id),
    PRIMARY KEY (projectId, goalId)
);
*/