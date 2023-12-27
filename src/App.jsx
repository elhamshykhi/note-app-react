import "./App.css";
import { useState } from "react";
import NotesList from "./components/NotesList";
import AddNewNoteForm from "./components/addNewNoteForm";
import { PlusIcon } from "@heroicons/react/24/outline";
import NotesProvider from "./context/NotesContext";

function App() {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

  return (
    <NotesProvider>
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
          <AddNewNoteForm handleCloseAddForm={() => setIsOpenAddForm(false)} />
        </div>
      </div>

      {/* app */}
      <div className="h-[calc(100vh_-_64px)] bg-gray-100">
        <div className="grid grid-cols-12 gap-x-4 max-w-screen-lg mx-auto px-4 h-full">
          <div className="col-span-12 sm:col-span-5 md:col-span-4 h-full py-6">
            <NotesList />
          </div>

          <div className="hidden sm:block sm:col-span-7 md:col-span-8 h-full py-6">
            <AddNewNoteForm />
          </div>
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;
