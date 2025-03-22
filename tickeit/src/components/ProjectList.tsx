import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProjectListProps {
  onSelectProject: (projectId: string) => void; // Pass projectId to onSelectProject function
}

interface ProjectBrief {
  title: string;
  description: string;
  techStack: string[];
  goals: string[];
}

interface Project {
  id: string; // This should be string since you're using `string` in the original code
  brief: ProjectBrief;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch projects from the backend when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/project-brief');
        setProjects(response.data.data); // Assuming the data comes in the 'data' property
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleSelectProject = (projectId: string) => {
    onSelectProject(projectId);
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    // Assuming you have a delete method for the backend; make an API call here if needed
    axios.delete(`http://localhost:5001/api/project-brief/${projectId}`)
      .then(() => {
        // Re-fetch the projects after deleting
        const fetchProjects = async () => {
          try {
            const response = await axios.get('http://localhost:5001/api/project-brief');
            setProjects(response.data.data);
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
        };
        fetchProjects();
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
      });
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
