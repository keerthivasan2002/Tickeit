// src/components/TaskList.tsx
import React from "react";
import { useProject } from "../contexts/ProjectContext";
import TaskCard from "./TaskCard";

const TaskList: React.FC = () => {
  const { tasks, selectedRole } = useProject();

  const filteredTasks = selectedRole
    ? tasks.filter((task) => task.assignedRole === selectedRole)
    : tasks;

  if (filteredTasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks available. Add meeting notes to generate tasks.</p>
      </div>
    );
  }

  // Group tasks by status
  const todoTasks = filteredTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "done");

  return (
    <div className="task-board">
      <div className="task-column">
        <h2>To Do</h2>
        <div className="task-cards">
          {todoTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {todoTasks.length === 0 && (
            <p className="empty-column">No tasks to do</p>
          )}
        </div>
      </div>

      <div className="task-column">
        <h2>In Progress</h2>
        <div className="task-cards">
          {inProgressTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {inProgressTasks.length === 0 && (
            <p className="empty-column">No tasks in progress</p>
          )}
        </div>
      </div>

      <div className="task-column">
        <h2>Done</h2>
        <div className="task-cards">
          {doneTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {doneTasks.length === 0 && (
            <p className="empty-column">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
