import { useState } from "react";
import { useNotesDispatch } from "../context/NotesContext";

function AddNewNoteForm({ handleCloseAddForm }) {
  const dispatch = useNotesDispatch();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleAddNewNote = (e) => {
    e.preventDefault();

    if (!title || !text) return;

    const newNote = {
      id: Date.now(),
      title,
      text,
      createdAt: new Date().toISOString(),
      important: false,
    };

    dispatch({ type: "addNote", payload: newNote });

    setTitle("");
    setText("");

    if (window.innerWidth < 640) {
      handleCloseAddForm();
    }
  };

  return (
    <div className="h-full">
      <form
        action=""
        className="flex flex-col gap-y-2.5 h-full"
        onSubmit={handleAddNewNote}
      >
        <input
          type="text"
          name="note-title"
          id="note-title"
          placeholder="Note Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          name="note-text"
          id="note-text"
          placeholder="Note Text"
          className="input flex-grow"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex items-center justify-between gap-x-2">
          <button
            type="button"
            onClick={handleCloseAddForm}
            className="button bg-white text-indigo-400 border-indigo-300 sm:hidden"
          >
            cancel
          </button>

          <button
            type="button"
            onClick={handleAddNewNote}
            className="button bg-indigo-400 text-white border-transparent"
          >
            add new note
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewNoteForm;
