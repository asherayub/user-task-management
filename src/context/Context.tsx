import { useState, createContext } from "react";
import mockTasks from "../tasks.json";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: "Not Started" | "In Progress" | "Completed";
  updatedAt: string;
}

interface ContextType {
  user: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState("admin");
  const [tasks, setTasks] = useState<Task[]>(mockTasks as Task[]);

  return (
    <Context.Provider value={{ user, tasks, setTasks }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
