import axios from "axios";

// Configuration
const GEMINI_API_KEY = "AIzaSyCbop97JqeAtmaQzIVzANnoZDrOMhhexQc";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Interfaces
interface Meeting {
  meetingId: string;
  meetingNotes: string;
  meetingTimestamp: string;
  projectId: string;
}

interface Project {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectStack: string[];
  projectRoles: string[];
  projectMembers: { user_id: string; name: string; role: string }[];
}

interface Task {
  taskId: string;
  projectId: string;
  assignedTo: string;
  taskDescription: string;
  taskStatus: string;
  taskSource: string;
}

// Custom error class
class GeminiAPIError extends Error {
  constructor(message: string, public statusCode?: number, public response?: any) {
    super(message);
    this.name = "GeminiAPIError";
  }
}

// Helper function to make API calls with retry logic
async function callGeminiAPI(payload: any, retries = 0): Promise<any> {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 429 && retries < MAX_RETRIES) {
        console.warn(`Rate limited. Retrying in ${RETRY_DELAY_MS}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (retries + 1)));
        return callGeminiAPI(payload, retries + 1);
      }
      
      throw new GeminiAPIError(
        `Gemini API error: ${error.response.data.error?.message || 'Unknown error'}`,
        error.response.status,
        error.response.data
      );
    }
    throw new GeminiAPIError(`Network error: ${error.message}`);
  }
}

export async function generateTasksFromContext(
  project: Project,
  meetings: Meeting[],
  existingTasks: Task[]
): Promise<Task[]> {
  try {
    const prompt = `
      Based on the following project details, meeting notes, and existing tasks, generate a list of new tasks that need to be completed.
      
      PROJECT DETAILS:
      ${JSON.stringify(project, null, 2)}
      
      MEETING NOTES:
      ${JSON.stringify(meetings, null, 2)}
      
      EXISTING TASKS:
      ${JSON.stringify(existingTasks, null, 2)}
      
      Please return a JSON array of tasks with the following structure:
      [
        {
          "taskId": "unique-id",
          "projectId": "${project.projectId}",
          "assignedTo": "One of: ${project.projectRoles.join(', ')}",
          "taskDescription": "Detailed description",
          "taskStatus": "todo",
          "taskSource": "ai"
        }
      ]
    `;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              taskId: { type: "STRING" },
              projectId: { type: "STRING" },
              assignedTo: { type: "STRING" },
              taskDescription: { type: "STRING" },
              taskStatus: { type: "STRING" },
              taskSource: { type: "STRING" }
            },
            required: ["taskDescription", "assignedTo", "taskStatus", "taskSource"]
          }
        }
      }
    };

    const data = await callGeminiAPI(payload);
    
    const generatedTasks = JSON.parse(data.candidates[0].content.parts[0].text);
    
    return generatedTasks.map((task: any) => ({
      ...task,
      taskId: task.taskId || `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      projectId: project.projectId
    }));
  } catch (error) {
    console.error("Error generating tasks:", error);
    if (error instanceof GeminiAPIError) {
      console.error(`API Error (${error.statusCode}):`, error.response);
    }
    return [];
  }
}

export async function getAIStandupResponse(
  role: string,
  project: Project,
  tasks: Task[],
  meetings: Meeting[]
): Promise<string> {
  try {
    const roleTasks = tasks.filter(task => task.assignedTo === role);
    
    const prompt = `
      You are an AI assistant helping with a software development project.
      
      PROJECT DETAILS:
      ${JSON.stringify(project, null, 2)}
      
      TASKS ASSIGNED TO ${role.toUpperCase()} ROLE:
      ${JSON.stringify(roleTasks, null, 2)}
      
      RECENT MEETING NOTES:
      ${JSON.stringify(meetings.slice(-2), null, 2)}
      
      Based on the above information, provide a concise standup response for a ${role} that includes:
      1. What they should focus on today
      2. Which tasks are highest priority
      3. Any potential blockers they should be aware of
      4. Any team dependencies they should know about
      
      Keep the response under 200 words and make it actionable.
    `;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 300
      }
    };

    const data = await callGeminiAPI(payload);
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating standup response:", error);
    if (error instanceof GeminiAPIError) {
      console.error(`API Error (${error.statusCode}):`, error.response);
    }
    return `Unable to generate standup response. Please check your tasks and try again.`;
  }
}
