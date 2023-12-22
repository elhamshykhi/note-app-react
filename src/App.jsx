import "./App.css";

import { useState } from "react";
import NotesList from "./components/NotesList";
import AddNewNoteForm from "./components/addNewNoteForm";

function App() {
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("latest");

  const handleAddNote = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleCompleteNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  return (
    <>
      {/* header */}
      <header className="shadow-md bg-indigo-400 text-white">
        <div className="max-w-screen-lg mx-auto px-4 h-16">
          <h1 className="font-bold text-xl leading-[64px] capitalize text-center">
            note app
          </h1>
        </div>
      </header>

      {/* mobile add new note form */}
      <div className="absolute inset-0 bg-indigo-400  items-center justify-center sm:hidden z-20 hidden">
        <div className="bg-indigo-50 w-5/6 h-4/5 py-10 px-4 rounded-xl">
          <AddNewNoteForm handleAddNote={handleAddNote} />
        </div>
      </div>

      {/* app */}
      <div className="h-[calc(100vh_-_64px)] bg-gray-100">
        <div className="grid grid-cols-12 gap-x-4 max-w-screen-lg mx-auto px-4 h-full">
          <div className="col-span-12 sm:col-span-5 md:col-span-4 h-full py-6">
            <NotesList
              notes={notes}
              handleDeleteNote={handleDeleteNote}
              handleCompleteNote={handleCompleteNote}
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
