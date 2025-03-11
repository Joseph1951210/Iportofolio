import { createContext, useState } from "react";

export const DraggableContext = createContext();

export const DraggableProvider = ({ children }) => {
  const editing = true;
  const [currentFocusedElementId, setCurrentFocusedElementId] = useState(null);
  return <DraggableContext.Provider value={{ editing, currentFocusedElementId, setCurrentFocusedElementId }}>
    {children}
  </DraggableContext.Provider>
}
