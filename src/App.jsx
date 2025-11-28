import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = () => {
    if (noteText.trim() === "") return;

    if (editIndex !== null) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = noteText;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      // Add new note
      setNotes([...notes, noteText]);
    }

    setNoteText("");
  };

  const editNote = (index) => {
    setNoteText(notes[index]);
    setEditIndex(index);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Student Notes App</h1>

      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Enter note"
      />
      <button onClick={addOrUpdateNote}>
        {editIndex !== null ? "Update Note" : "Add Note"}
      </button>

      <ul>
        {notes.map((note, index) => (
          <li key={index} style={{ marginTop: "0.5rem" }}>
            {note}{" "}
            <button onClick={() => editNote(index)}>Edit</button>{" "}
            <button onClick={() => deleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
