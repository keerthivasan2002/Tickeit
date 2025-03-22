// src/components/ProjectList.tsx
import React from 'react';


interface ProjectListProps {
  onSelectProject: () => void;
}

const dummyProjects = [
  { id: 1, name: 'Project Alpha', description: 'This is a test project for demonstration purposes.' },
  { id: 2, name: 'Project Beta', description: 'Another dummy project to showcase functionality.' },
  { id: 3, name: 'Project Gamma', description: 'A sample project to help with testing.' },
  // Add more dummy projects as needed
];

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  return (
    <div className="project-list">
      <h3>Existing Projects:</h3>
      {dummyProjects.map(project => (
        <div key={project.id} className="project-item">
          <h4>{project.name}</h4>
          <p>{project.description}</p>
          <button className="btn-secondary" onClick={onSelectProject}>
            Select Project
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;