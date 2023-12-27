import { useContext, useReducer } from "react";
import { createContext } from "react";

const NotesContext = createContext();
const NotesDispatchContext = createContext();

function notesReducer(notes, { type, payload }) {
  switch (type) {
    case "addNote":
      return [...notes, payload];
    case "deleteNote":
      return notes.filter((note) => note.id !== payload);
    case "importantNote":
      return notes.map((note) =>
        note.id === payload ? { ...note, important: !note.important } : note
      );
    default:
      throw new Error("unknown error :" + type);
  }
}

export default function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, []);

  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
export function useNotesDispatch() {
  return useContext(NotesDispatchContext);
}
