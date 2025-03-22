// src/components/ProjectList.tsx
import React, { useEffect, useState } from "react";
import { dataStore } from "../data/data"; // Fixed import path
import { ProjectBrief } from "../models/interfaces";

interface ProjectListProps {
  onSelectProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<{ id: string; brief: ProjectBrief }[]>([]);

  const refreshProjects = () => {
    const allProjects = dataStore.getAllProjects();
    setProjects(allProjects);
  };

  useEffect(() => {
    // Initial fetch of projects
    refreshProjects();

    // Set up event listeners to refresh when tab becomes visible or window gains focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshProjects();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', refreshProjects);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', refreshProjects);
    };
  }, []);

  const handleSelectProject = (projectId: string) => {
    dataStore.setCurrentProject(projectId);
    onSelectProject(projectId);
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    if (dataStore.deleteProject(projectId)) {
      refreshProjects();
    }
  };

  if (projects.length === 0) {
    return (
      <div className="empty-projects">
        <p>You don't have any projects yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-card"
          onClick={() => handleSelectProject(project.id)}
        >
          <h3>{project.brief.title}</h3>
          <p>{project.brief.description.substring(0, 100)}...</p>
          <div className="tech-stack">
            {project.brief.techStack.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
          <button
            className="btn-delete"
            onClick={(e) => handleDeleteProject(e, project.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
