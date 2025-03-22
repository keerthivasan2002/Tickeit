// src/components/TaskCard.tsx
import React from "react";
import { Task } from "../models/interfaces";
import { useProject } from "../contexts/ProjectContext";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask } = useProject();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask({
      ...task,
      status: e.target.value as any,
    });
  };

  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className="task-role">{task.assignedRole}</span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-footer">
        <div className="task-meta">
          <span className="task-date">
            Created: {task.createdAt.toLocaleDateString()}
          </span>
          <span className={`task-priority priority-${task.priority}`}>
            {task.priority.toUpperCase()}
          </span>
        </div>

        <div className="task-actions">
          <select value={task.status} onChange={handleStatusChange}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
