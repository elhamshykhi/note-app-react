import { useState } from "react";

function AddNewNoteForm({ handleAddNote }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !text) return;

    const newNote = {
      id: Date.now(),
      title,
      text,
      createdAt: new Date().toISOString(),
      completed: false,
    };

    handleAddNote(newNote);

    setTitle("");
    setText("");
  };

  return (
    <div className="h-full">
      <form
        action=""
        className="flex flex-col gap-y-2.5 h-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Note Title"
          className="bg-white border-2 border-indigo-300 rounded-lg py-2 px-4 placeholder:text-indigo-300 text-sm focus:outline-none text-indigo-400 font-medium"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          name=""
          id=""
          placeholder="Note Text"
          className="bg-white flex-grow h-full border-2 border-indigo-300 rounded-lg py-2 px-4 placeholder:text-indigo-300 text-sm focus:outline-none text-indigo-400 font-medium"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex items-center justify-between gap-x-2">
          <button
            type="button"
            className="bg-white text-indigo-400 border-2 border-indigo-300 font-semibold text-center capitalize w-full py-2 rounded-lg mt-auto sm:hidden"
          >
            cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-400 text-white border-2 border-transparent font-semibold text-center capitalize w-full py-2 rounded-lg mt-auto"
          >
            add new note
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewNoteForm;
