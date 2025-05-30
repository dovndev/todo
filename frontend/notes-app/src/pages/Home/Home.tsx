import React, { useState } from "react";

type Note = {
    id: number;
    title: string;
    content: string;
};

const Home: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [search, setSearch] = useState("");

    const handleAddNote = () => {
        if (!title.trim() || !content.trim()) return;
        setNotes([
            ...notes,
            { id: Date.now(), title: title.trim(), content: content.trim() },
        ]);
        setTitle("");
        setContent("");
    };

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
            <h1>Notes App</h1>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem" }}
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", minHeight: 80 }}
                />
                <button onClick={handleAddNote} style={{ marginTop: "0.5rem" }}>
                    Add Note
                </button>
            </div>
            <div>
                {filteredNotes.length === 0 ? (
                    <p>No notes found.</p>
                ) : (
                    filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: 4,
                                padding: "1rem",
                                marginBottom: "1rem",
                                position: "relative",
                            }}
                        >
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <button
                                onClick={() => handleDeleteNote(note.id)}
                                style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    background: "#f44336",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "0.25rem 0.5rem",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;