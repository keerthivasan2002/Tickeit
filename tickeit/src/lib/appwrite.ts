import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Or your local endpoint
  .setProject("your_project_id"); // From Appwrite console

const databases = new Databases(client);

export { client, databases, ID };
