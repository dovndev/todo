import React, { useState, useEffect } from "react";

function ToDo() {
    const [issignup, setSignup] = useState(false);
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [accountNotfound, setAccount] = useState("");
    const [isLoggedin, setLogin] = useState(false);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    useEffect(() => {
        if (isLoggedin) {
            const storedData = JSON.parse(localStorage.getItem(userid));
            if (storedData) {
                setNotes(storedData.notes);
            }
        }
    }, [isLoggedin, userid]);

    useEffect(() => {
        if (isLoggedin) {
            const data = { password: password, notes: notes };
            localStorage.setItem(userid, JSON.stringify(data));
        }
    }, [notes, isLoggedin, userid, password]);

    function handleUserid(event) {
        setUserid(event.target.value);
    }

    function handlePasswd(event) {
        setPassword(event.target.value);
    }

    function resetForm() {
        setUserid("");
        setPassword("");
        setAccount("");
        setNewNote("");
    }

    function signUp(event) {
        event.preventDefault();
        if (!userid || !password) {
            setAccount("invalid userid or password.");
            return;
        }
        const data = { password, notes: [] };
        localStorage.setItem(userid, JSON.stringify(data));
        setLogin(true);
        resetForm();
    }

    function checkLogin(event) {
        event.preventDefault();
        const userdata = localStorage.getItem(userid);
        if (!userdata) {
            setAccount("Account not found!");
            return;
        }

        const data = JSON.parse(userdata);
        if (password === data.password) {
            setLogin(true);
            setAccount("");
            setNotes(data.notes);
        } else {
            setAccount("Invalid credentials!");
        }
        resetForm();
    }

    function handleInput(event) {
        setNewNote(event.target.value);
    }

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            addNote();
        }
    };

    function addNote() {
        if (newNote.trim() !== "") {
            setNotes((prevNotes) => [...prevNotes, newNote]);
            setNewNote("");
        }
    }

    function deleteNote(index) {
        setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    }

    function editNote(index) {
        setNewNote(notes[index]);
    }

    function moveNoteUp(index) {
        if (index > 0) {
            setNotes((prevNotes) => {
                const updatedNotes = [...prevNotes];
                const [movedNote] = updatedNotes.splice(index, 1);
                updatedNotes.splice(index - 1, 0, movedNote);
                return updatedNotes;
            });
        }
    }

    function moveNoteDown(index) {
        if (index < notes.length - 1) {
            setNotes((prevNotes) => {
                const updatedNotes = [...prevNotes];
                const [movedNote] = updatedNotes.splice(index, 1);
                updatedNotes.splice(index + 1, 0, movedNote);
                return updatedNotes;
            });
        }
    }

    function menuOpen() {
        // Future implementation
    }

    return (
        <div className="todolist">
            <div className="header">
                <h1>ToDo</h1>
                <span className="header_span" onClick={menuOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </span>
            </div>
            <div className="notecontent">
                {isLoggedin ? (
                    <div>
                        <div className="inputdiv">
                            <input
                                type="text"
                                onKeyDown={handleEnter}
                                placeholder="Enter something you want to do..."
                                value={newNote}
                                onChange={handleInput}
                            />
                            <button id="addbtn" className="addbutton" onClick={addNote}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 9l6 6-6 6" />
                                    <path d="M4 4v7a4 4 0 0 0 4 4h11" />
                                </svg>
                            </button>
                        </div>
                        {notes.length > 0 ? (
                            <ol>
                                {notes.map((note, index) => (
                                    <li key={index}>
                                        <span className="text">{note}</span>
                                        <div className="buttons">
                                            <button className="deletebutton" onClick={() => deleteNote(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                </svg>
                                            </button>
                                            <button className="editbutton" onClick={() => editNote(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                                                </svg>
                                            </button>
                                            <button className="movebutton" onClick={() => moveNoteUp(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 19V6M5 12l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <button className="movebutton" onClick={() => moveNoteDown(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 5v13M5 12l7 7 7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <div className="empty">
                                <h2>empty</h2>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {issignup ? (
                            <div className="loginform">
                                <form onSubmit={signUp}>
                                    <h1>Signup</h1>
                                    <div className="loginbox">
                                        <div className="inputs">
                                            <input onChange={handleUserid} type="text" placeholder="userid" value={userid} required />
                                            <input onChange={handlePasswd} type="password" placeholder="password" value={password} required />
                                        </div>
                                        <div className="loginbtn">
                                            <button type="submit">Signup</button>
                                        </div>
                                        <div className="signupbtn">
                                            <button type="button" onClick={() => { setSignup(false); resetForm(); }}>login</button>
                                        </div>
                                        <span className="errorbox">{accountNotfound}</span>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="loginform">
                                <form onSubmit={checkLogin}>
                                    <h1>Login</h1>
                                    <div className="loginbox">
                                        <div className="inputs">
                                            <input onChange={handleUserid} type="text" placeholder="userid" value={userid} required />
                                            <input onChange={handlePasswd} type="password" placeholder="password" value={password} required />
                                        </div>
                                        <div className="loginbtn">
                                            <button type="submit">Login</button>
                                        </div>
                                        <div className="signupbtn">
                                            <button onClick={() => { setSignup(true); resetForm(); }}>signup</button>
                                        </div>
                                        <span className="errorbox">{accountNotfound}</span>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ToDo;