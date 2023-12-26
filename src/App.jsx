import "./App.css";
import { useReducer, useState } from "react";
import NotesList from "./components/NotesList";
import AddNewNoteForm from "./components/addNewNoteForm";
import { PlusIcon } from "@heroicons/react/24/outline";

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

function App() {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [sortBy, setSortBy] = useState("latest");
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

  const handleAddNote = (newNote) =>
    dispatch({ type: "addNote", payload: newNote });

  const handleDeleteNote = (id) =>
    dispatch({ type: "deleteNote", payload: id });

  const handleImportantNote = (id) =>
    dispatch({ type: "importantNote", payload: id });

  return (
    <>
      {/* header */}
      <header className="shadow-md bg-indigo-400 text-white">
        <div className="max-w-screen-lg mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-xl leading-[64px] capitalize text-center">
            note app
          </h1>
          <button className="sm:hidden" onClick={() => setIsOpenAddForm(true)}>
            <PlusIcon className="w-6 h-6 pointer-events-none" />
          </button>
        </div>
      </header>

      {/* mobile add new note form */}
      <div
        className={`absolute inset-0 bg-indigo-400 items-center justify-center ${
          isOpenAddForm ? "flex" : "hidden"
        } sm:hidden z-20`}
      >
        <div className="bg-indigo-50 w-5/6 h-4/5 py-10 px-4 rounded-xl">
          <AddNewNoteForm
            handleCloseAddForm={() => setIsOpenAddForm(false)}
            handleAddNote={handleAddNote}
          />
        </div>
      </div>

      {/* app */}
      <div className="h-[calc(100vh_-_64px)] bg-gray-100">
        <div className="grid grid-cols-12 gap-x-4 max-w-screen-lg mx-auto px-4 h-full">
          <div className="col-span-12 sm:col-span-5 md:col-span-4 h-full py-6">
            <NotesList
              notes={notes}
              handleDeleteNote={handleDeleteNote}
              handleImportantNote={handleImportantNote}
              sortBy={sortBy}
              handleSort={(e) => setSortBy(e.target.value)}
            />
          </div>

          <div className="hidden sm:block sm:col-span-7 md:col-span-8 h-full py-6">
            <AddNewNoteForm handleAddNote={handleAddNote} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
