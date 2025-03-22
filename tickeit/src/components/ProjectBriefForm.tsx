import React, { useState } from "react";
import { useProject } from "../contexts/ProjectContext";
import Select from "react-select";


// Combine availableTechStacks with your current tech stack options
const availableTechStacks = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Next.js",
  "Vue.js",
  "Angular",
  "Python",
  "Django",
  "Flask",
  "AWS",
  "Docker",
  "Kubernetes"
];

const roleOptions = [
  { value: "frontend", label: "frontend" },
  { value: "backend", label: "backend" },
  { value: "ai", label: "ai" },
  { value: "pm", label: "pm" },
  { value: "designer", label: "designer" },
];


const techOptions = availableTechStacks.map((tech) => ({
  value: tech,
  label: tech
}));

const ProjectBriefForm: React.FC = () => {
  const { setProjectBrief } = useProject();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "member-1", name: "", role: "" },
  ]);
  const [goals, setGoals] = useState("");

  const handleTechChange = (selectedOptions: any) => {
    setTechStack(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goalsArray = goals.split("\n").filter((goal) => goal.trim() !== "");
    setProjectBrief({
      title,
      description,
      techStack,
      teamMembers,
      goals: goalsArray,
    });
  };

  // Update Team Member
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...teamMembers];
  
    if (field === "role") {
      updatedMembers[index][field] = value as Role; // Cast to Role
    } else {
      updatedMembers[index][field] = value;
    }
  
    setTeamMembers(updatedMembers);
  };

  // Add New Team Member
  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { id: `member-${teamMembers.length + 1}`, name: "", role: "" },
    ]);
  };

  return (
    <div className="card p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Project Brief</h2>
      <form onSubmit={handleSubmit}>

        {/* Project Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">Project Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Project Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Project Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <label htmlFor="techStack" className="block text-sm font-medium">Tech Stack</label>
          <Select
            id="techStack"
            isMulti
            options={techOptions}
            value={techStack.map((tech) => ({ value: tech, label: tech }))}
            onChange={handleTechChange}
            placeholder="Select Tech Stack"
            className="mt-1"
          />
        </div>

        {/* Team Member Inputs */}
        <div className="mb-4">
          <label htmlFor="teamMembers" className="block text-sm font-medium">Add Team Members (Name and Role)</label>
          <div className="space-y-20">
            {/* Loop through the team members */}
            {teamMembers.map((member, index) => (
              <div key={index} className="flex space-y-6 mb-6"> {/* Added margin-bottom to each row */}
                {/* Name Input */}
                <input
                  type="text"
                  placeholder={`Enter Name ${index + 1}`}
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                  className="p-3 border border-gray-300 space-y-6 rounded-md w-full"
                />
                {/* Role Dropdown */}
                <Select
                  value={{ value: member.role, label: member.role }}
                  onChange={(selectedOption) => handleTeamMemberChange(index, "role", selectedOption?.value || "")}
                  options={roleOptions}  // 🚨 Potential issue here!
                  className="w-40 space-y-6"
                />
              </div>
            ))}
          </div>
          {/* Add Team Member Button */}
          <button
            type= "button"
            onClick={addTeamMember}
            className= "btn-primary"
          >
            Add Team Member
          </button>
        </div>

        {/* Project Goals */}
        <div className="form-group">
          <label htmlFor="goals" className="block text-sm font-medium">Project Goals (one per line)</label>
          <textarea
            id="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Create a functional MVP 
Implement user authentication
Deploy to production"
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
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
