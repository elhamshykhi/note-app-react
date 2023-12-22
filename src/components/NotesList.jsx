import NotesStatus from "./NotesStatus";

function NotesList({
  notes,
  handleDeleteNote,
  handleCompleteNote,
  sortBy,
  handleSort,
}) {
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
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  }
  return (
    <div className="h-[calc(100vh_-_112px)]">
      {/* Notes List */}
      <div className="flex flex-col gap-y-2 h-full overflow-y-auto bg-indigo-400 rounded-xl p-4 relative">
        <NotesStatus notes={notes} sortBy={sortBy} handleSort={handleSort} />

        {notes.length ? (
          sortedNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              handleDeleteNote={handleDeleteNote}
              handleCompleteNote={handleCompleteNote}
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

function NoteItem({ note, handleDeleteNote, handleCompleteNote }) {
  return (
    <div className="bg-white p-4 rounded-xl text-indigo-400">
      <div className="flex items-center justify-between border-b border-b-indigo-100 pb-2 mb-2">
        <div className="">
          <p className="font-bold capitalize break-all">{note.title}</p>
          <p className="text-indigo-300 text-xs">
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-x-1.5">
          <button onClick={() => handleDeleteNote(note.id)} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 stroke-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <input
            type="checkbox"
            onChange={() => handleCompleteNote(note.id)}
            name={note.id}
            id={note.id}
            value={note.id}
            checked={note.completed}
            className="w-4 h-4"
          />
        </div>
      </div>

      <p className="break-all line-clamp-2 text-sm font-medium">{note.text}</p>
    </div>
  );
}

export default NotesList;
