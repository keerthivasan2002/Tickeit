# Tickeit - AI-Powered Project Management

Tickeit is an AI-powered project management tool that helps teams manage tasks, meeting notes, and project briefs efficiently. This project uses React, TypeScript, Vite, and various other technologies to provide a seamless experience.

## Features

- Create and manage project briefs
- Add and manage team members
- Generate tasks from meeting notes using AI
- View tasks by role
- AI stand-up chat for personalized guidance

## Technologies Used

- React
- TypeScript
- Vite
- Appwrite
- Tailwind CSS
- Express
- SQLite
- Google Gemini API

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/tickeit.git
   cd tickeit
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your Google Gemini API key:

   ```env
   VITE_GEMINI_API_KEY=your-google-gemini-api-key
   ```

   > **Disclaimer:** The API keys are not provided in this repository. You can apply for a free API key from Google to use in the code.

### Running the Project

1. Start the backend server:

   ```sh
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```sh
   cd ..
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## License

This project is licensed under the MIT License.
