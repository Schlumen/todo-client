import "./notes-view.css"
import { useEffect, useState } from "react";
import { Editor } from "../editor/editor";

export const NotesView = ({ token, onLoggedOut }) => {
    const [editing, setEditing] = useState(false);
    const [list, setList] = useState([]);

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
    }, [token]);

    return (
        <>
            <div className="notes-view-wrapper">
                <nav className="navbar">
                    <h1 className="navbar-title">My Eisenhower To-Do List</h1>
                    <button className="logout-button" onClick={onLoggedOut}>Logout</button>
                </nav>
                <div className="notes-wrapper">
                    <div className="note-category" id="A">
                        <ul className="note-list list-A">
                            {list.map(note => {
                                if (note.category === "A") {
                                    return (<li key={note._id} className="note-list-item">{note.title}</li>)
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                    <div className="note-category" id="B">
                        <ul className="note-list list-B">
                            {list.map(note => {
                                if (note.category === "B") {
                                    return (<li key={note._id} className="note-list-item">{note.title}</li>)
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                    <div className="note-category" id="C">
                        <ul className="note-list list-C">
                            {list.map(note => {
                                if (note.category === "C") {
                                    return (<li key={note._id} className="note-list-item">{note.title}</li>)
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                    <div className="note-category" id="D">
                        <ul className="note-list list-D">
                            {list.map(note => {
                                if (note.category === "D") {
                                    return (<li key={note._id} className="note-list-item">{note.title}</li>)
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
                <button className="add-item" onClick={() => setEditing(false)}><b>+</b></button>
            </div>
            {editing ? <Editor /> : <></>}
        </>
    );
}