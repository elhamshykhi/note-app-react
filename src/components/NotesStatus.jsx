function NotesStatus({ notes, sortBy, handleSort }) {
  if (!notes.length) return;

  return (
    <div className="bg-indigo-400 sticky top-0">
      <select
        value={sortBy}
        onChange={handleSort}
        className="bg-white text-indigo-500 px-2 py-1 rounded-lg outline-none w-full"
      >
        <option value="latest">latest notes</option>
        <option value="earliest">earliest notes</option>
        <option value="completed">completed notes</option>
      </select>

      <ul className="flex items-center justify-between py-4 capitalize text-xs text-white font-semibold">
        <li className="">
          all
          <span className="bg-white text-indigo-400 w-5 h-5 inline-block leading-5 text-center rounded-full ml-1">
            {notes.length}
          </span>
        </li>
        <li className="">
          completed
          <span className="bg-white text-indigo-400 w-5 h-5 inline-block leading-5 text-center rounded-full ml-1">
            {notes.filter((note) => note.completed).length}
          </span>
        </li>
        <li className="">
          uncompleted
          <span className="bg-white text-indigo-400 w-5 h-5 inline-block leading-5 text-center rounded-full ml-1">
            {notes.filter((note) => !note.completed).length}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default NotesStatus;
