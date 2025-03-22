import { createProject } from "../api/createProject";

const CreateButton = () => {
  const handleCreate = async () => {
    await createProject({
      name: "RoleMind AI",
      description: "AI assistant for role-based tasking",
      stack: ["React", "Appwrite", "Gemini"],
      teamRoles: ["Frontend", "Backend", "PM"],
      members: [
        { user_id: "user123", name: "Isaac", role: "Frontend" },
        { user_id: "user456", name: "Jamie", role: "Backend" },
      ],
    });
    alert("Project created!");
  };

  return (
    <button
      className="bg-indigo-600 text-white px-4 py-2 rounded"
      onClick={handleCreate}
    >
      Create Project Test
    </button>
  );
};

export default CreateButton;
