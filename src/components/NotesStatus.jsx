import { useNotes } from "../context/NotesContext";

function NotesStatus({ sortBy, handleSort }) {
  const notes = useNotes();

  if (!notes.length) return;

  const allNotes = notes.length;
  const importantNotes = notes.filter((note) => note.important).length;

  return (
    <div className="bg-indigo-400 sticky top-0">
      <select
        value={sortBy}
        onChange={handleSort}
        className="bg-white text-indigo-500 py-1 rounded-lg outline-none w-full capitalize"
      >
        {["latest", "earliest", "important"].map((item) => (
          <option key={item} value={item}>
            {item} notes
          </option>
        ))}
      </select>

      <ul className="flex items-center justify-between py-4 capitalize text-xs text-white font-semibold">
        {["all", "important"].map((item) => (
          <li key={item} className="capitalize flex items-center gap-x-1.5">
            <span className="bg-white text-indigo-400 w-5 h-5 inline-block leading-5 text-center rounded-full">
              {item === "all" ? allNotes : importantNotes}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesStatus;
