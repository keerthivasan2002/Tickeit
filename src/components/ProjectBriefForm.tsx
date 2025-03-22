// src/components/ProjectBriefForm.tsx
import React, { useState } from "react";
import { useProject } from "../contexts/ProjectContext";

const ProjectBriefForm: React.FC = () => {
  const { setProjectBrief } = useProject();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [goals, setGoals] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const techStackArray = techStack.split(",").map((tech) => tech.trim());
    const goalsArray = goals.split("\n").filter((goal) => goal.trim() !== "");

    // Parse team members from input
    const teamMembersArray = teamMembers
      .split("\n")
      .filter((member) => member.trim() !== "")
      .map((member, index) => {
        const [name, role] = member.split("-").map((part) => part.trim());
        return {
          id: `member-${index}`,
          name,
          role: role as any,
        };
      });

    setProjectBrief({
      title,
      description,
      techStack: techStackArray,
      teamMembers: teamMembersArray,
      goals: goalsArray,
    });
  };

  return (
    <div className="card">
      <h2>Project Brief</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="techStack">Tech Stack (comma separated)</label>
          <input
            id="techStack"
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="React, TypeScript, Firebase"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="teamMembers">
            Team Members (one per line, format: Name - Role)
          </label>
          <textarea
            id="teamMembers"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            placeholder="John - frontend
Jane - backend
Mike - pm"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="goals">Project Goals (one per line)</label>
          <textarea
            id="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Create a functional MVP
Implement user authentication
Deploy to production"
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Save Project Brief
        </button>
      </form>
    </div>
  );
};

export default ProjectBriefForm;
