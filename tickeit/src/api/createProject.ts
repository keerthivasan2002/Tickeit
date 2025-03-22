// src/api/createProject.ts
import { databases, ID } from "../lib/appwrite";

export const createProject = async ({
  name,
  description,
  stack,
  teamRoles,
  members,
}: {
  name: string;
  description: string;
  stack: string[];
  teamRoles: string[];
  members: {
    user_id: string;
    name: string;
    role: string;
  }[];
}) => {
  try {
    const response = await databases.createDocument(
      "your-database-id", // Replace with your DB ID
      "projects", // Your collection ID
      ID.unique(),
      {
        name,
        description,
        stack,
        team_roles: teamRoles,
        members: JSON.stringify(members), // Stored as a JSON string
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
