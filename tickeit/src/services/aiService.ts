import axios from "axios";
import { ProjectBrief, MeetingNote, Task, Role } from "../models/interfaces";

// In a real app, this would be your API endpoint
const API_URL = "https://your-backend-api.com/ai";

export async function generateTasksFromContext(
  projectBrief: ProjectBrief,
  meetingNotes: MeetingNote[],
  existingTasks: Task[]
): Promise<Task[]> {
  try {
    // In a hackathon, you might mock this response for demo purposes
    // This is where you'd normally call your Gemini API

    // For demo purposes, let's return mock data
    return mockGenerateTasks(
      projectBrief,
      meetingNotes[meetingNotes.length - 1]
    );

    // In production:
    // const response = await axios.post(`${API_URL}/generate-tasks`, {
    //   projectBrief,
    //   meetingNotes,
    //   existingTasks
    // });
    // return response.data;
  } catch (error) {
    console.error("Error generating tasks:", error);
    return [];
  }
}

// Mock function for demo purposes
function mockGenerateTasks(
  projectBrief: ProjectBrief,
  latestMeeting?: MeetingNote
): Task[] {
  const roles = projectBrief.teamMembers.map((member) => member.role);
  const techStack = projectBrief.techStack;

  const mockTasks: Task[] = [];

  // Generate tasks for frontend
  if (roles.includes("frontend")) {
    mockTasks.push({
      id: `task-${Date.now()}-1`,
      title: "Create login form",
      description: `Implement a login form using ${
        techStack.includes("React") ? "React hooks" : "the frontend framework"
      } with email and password fields`,
      assignedRole: "frontend",
      status: "todo",
      priority: "high",
      createdAt: new Date(),
    });
  }

  // Generate tasks for backend
  if (roles.includes("backend")) {
    mockTasks.push({
      id: `task-${Date.now()}-2`,
      title: "Set up authentication routes",
      description: `Create authentication endpoints using ${
        techStack.includes("Firebase")
          ? "Firebase Authentication"
          : "your backend stack"
      }`,
      assignedRole: "backend",
      status: "todo",
      priority: "high",
      createdAt: new Date(),
    });
  }

  // Generate tasks for PM
  if (roles.includes("pm")) {
    mockTasks.push({
      id: `task-${Date.now()}-3`,
      title: "Create sprint plan",
      description: "Organize tasks into a 1-week sprint and assign priorities",
      assignedRole: "pm",
      status: "todo",
      priority: "medium",
      createdAt: new Date(),
    });
  }

  // Generate tasks for AI engineer
  if (roles.includes("ai")) {
    mockTasks.push({
      id: `task-${Date.now()}-4`,
      title: "Set up Gemini API integration",
      description:
        "Create a service to handle Gemini API calls for task generation",
      assignedRole: "ai",
      status: "todo",
      priority: "high",
      createdAt: new Date(),
    });
  }

  return mockTasks;
}

export async function getAIStandupResponse(
  role: Role,
  projectBrief: ProjectBrief,
  tasks: Task[],
  meetingNotes: MeetingNote[]
): Promise<string> {
  // Mock response for demo
  const roleTasks = tasks.filter(
    (task) => task.assignedRole === role && task.status === "todo"
  );

  return `Based on your role as a ${role} developer and the recent meeting notes, 
  here are your priorities for today:
  
  1. ${roleTasks[0]?.title || "Review the project requirements"}
  2. ${roleTasks[1]?.title || "Coordinate with team members"}
  
  I recommend focusing on ${
    roleTasks[0]?.title || "understanding the project scope"
  } first 
  as it will unblock other team members.`;
}
