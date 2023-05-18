import "./notes-view.css"
import { useEffect, useState } from "react";
import { Editor } from "../editor/editor";

export const NotesView = ({ token, onLoggedOut }) => {
    const [editing, setEditing] = useState(false);
    const [list, setList] = useState([]);
    const [todo, setTodo] = useState();

    useEffect(() => {
        fetch("https://todoapp-afqp.onrender.com/api/users/user-note", {
            method: "GET",
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setList(data);
            });
    }, [editing, token]);

    const getListItem = (note) => {
        return (
            <li
                key={note._id}
                className={`note-list-item${note.done ? " done" : ""}`}
                onClick={() => {
                    setTodo(note);
                    setEditing(true);
                }}
            >{note.title}</li>
        );
    }

    return (
        <>
            <div className="notes-view-wrapper">
                <nav className="navbar">
                    <h1 className="navbar-title">My Eisenhower To-Do List</h1>
                    <button className="logout-button" onClick={onLoggedOut}>Logout</button>
                </nav>
                <div className="notes-wrapper">
                    <div className="note-category" id="A">
                        <h2 id="ui">Urgent and Important</h2>
                        <ul className="note-list list-A">
                            {list.map(note => {
                                if (note.category === "A") {
                                    return getListItem(note);
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                    <div className="note-category" id="B">
                        <h2 id="i">Important but not Urgent</h2>
                        <ul className="note-list list-B">
                            {list.map(note => {
                                if (note.category === "B") {
                                    return getListItem(note);
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                    <div className="note-category" id="C">
                        <h2 id="u">Urgent but not Important</h2>
                        <ul className="note-list list-C">
                            {list.map(note => {
                                if (note.category === "C") {
                                    return getListItem(note);
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                    <div className="note-category" id="D">
                        <h2 id="n">Neither Urgent nor Important</h2>
                        <ul className="note-list list-D">
                            {list.map(note => {
                                if (note.category === "D") {
                                    return getListItem(note);
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
                <button
                    className="add-item"
                    onClick={() => {
                        setTodo(null);
                        setEditing(true);
                    }}
                >
                    <b>+</b>
                </button>
            </div>
            {editing ? <Editor token={token} note={todo} onClose={() => setEditing(false)} /> : null}
        </>
    );
}