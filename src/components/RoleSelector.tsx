// src/components/RoleSelector.tsx
import React from "react";
import { useProject } from "../contexts/ProjectContext";
import { Role } from "../models/interfaces";

const RoleSelector: React.FC = () => {
  const { projectBrief, selectedRole, selectRole } = useProject();

  if (!projectBrief) {
    return null;
  }

  const roles = projectBrief.teamMembers.map((member) => member.role);
  const uniqueRoles = Array.from(new Set(roles));

  return (
    <div className="role-selector">
      <h2>View Tasks By Role</h2>
      <div className="role-buttons">
        <button
          className={selectedRole === null ? "active" : ""}
          onClick={() => selectRole(null as any)}
        >
          All Roles
        </button>

        {uniqueRoles.map((role) => (
          <button
            key={role}
            className={selectedRole === role ? "active" : ""}
            onClick={() => selectRole(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
