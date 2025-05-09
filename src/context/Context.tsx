import { useState, createContext } from "react";
import mockTasks from "../tasks.json";

const Context = createContext({});

export function ContextProvider({ children }) {
  const [user, setUser] = useState("admin");
  const [tasks, setTasks] = useState(mockTasks);

  return (
    <Context.Provider value={{ user, tasks, setTasks }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
