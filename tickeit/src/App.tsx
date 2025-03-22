// src/App.tsx
import React, { useState } from "react";
import { ProjectProvider } from "./contexts/ProjectContext";
import AppHeader from "./components/AppHeader";
import ProjectBriefForm from "./components/ProjectBriefForm";
import MeetingNotesInput from "./components/MeetingNotesInput";
import RoleSelector from "./components/RoleSelector";
import TaskList from "./components/TaskList";
import AIStandupChat from "./components/AIStandupChat";
import "./App.css";

const App: React.FC = () => {
  const [setupComplete, setSetupComplete] = useState(false);

  return (
    <ProjectProvider>
      <div className="app-container">
        <AppHeader />

        <main className="app-content">
          {!setupComplete ? (
            <div className="setup-container">
              <h2>Set Up Your Project</h2>
              <ProjectBriefForm />
              <button
                className="btn-primary"
                onClick={() => setSetupComplete(true)}
              >
                Continue 
              </button>
            </div>
          ) : ( //divider
            <>
              <div className="left-panel">
                <MeetingNotesInput />
                <AIStandupChat />
              </div>

              <div className="right-panel">
                <RoleSelector />
                <TaskList />
              </div>
            </>
          )}
        </main>

        <footer className="app-footer">
          <p>Team Ticke - iNTUition 2025</p>
        </footer>
      </div>
    </ProjectProvider>
  );
};

export default App;
