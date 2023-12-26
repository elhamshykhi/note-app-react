import NotesStatus from "./NotesStatus";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";

function NotesList({
  notes,
  handleDeleteNote,
  handleImportantNote,
  sortBy,
  handleSort,
}) {
  // sort notes
  let sortedNotes = notes;
  if (sortBy === "latest") {
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortBy === "earliest") {
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  } else {
    sortedNotes = [...notes].sort(
      (a, b) => Number(a.important) - Number(b.important)
    );
  }

  return (
    <div className="h-full">
      <div className="flex flex-col gap-y-2 h-full overflow-y-auto bg-indigo-400 rounded-xl p-4 relative flex-grow">
        <NotesStatus notes={notes} sortBy={sortBy} handleSort={handleSort} />

        {notes.length ? (
          sortedNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              handleDeleteNote={handleDeleteNote}
              handleImportantNote={handleImportantNote}
            />
          ))
        ) : (
          <p className="capitalize text-white text-center font-medium absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            notes list is empty !
          </p>
        )}
      </div>
    </div>
  );
}

function NoteItem({ note, handleDeleteNote, handleImportantNote }) {
  const dateOption = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="bg-white p-4 rounded-xl text-indigo-400">
      <div className="flex items-center justify-between border-b border-b-indigo-100 pb-2 mb-2">
        <div>
          <p className="font-bold capitalize break-all">{note.title}</p>
          <p className="text-indigo-300 text-xs">
            {new Date(note.createdAt).toLocaleDateString("en-US", dateOption)}
          </p>
        </div>

        <div className="flex items-center gap-x-1.5">
          <button type="button" className="relative w-5 h-5">
            <input
              type="checkbox"
              onChange={() => handleImportantNote(note.id)}
              name={note.id}
              id={note.id}
              value={note.id}
              checked={note.important}
              className="appearance-none w-5 h-5 cursor-pointer"
            />
            <StarIcon
              className={`svg absolute left-0 top-0 stroke-amber-400 ${
                note.important ? "fill-amber-400" : "fill-transparent"
              }`}
            />
          </button>
          <button type="button" onClick={() => handleDeleteNote(note.id)}>
            <XMarkIcon className="svg stroke-red-600" />
          </button>
        </div>
      </div>

      <p className="break-all line-clamp-2 text-sm font-medium">{note.text}</p>
    </div>
  );
}

export default NotesList;
