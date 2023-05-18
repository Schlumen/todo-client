import "./editor.css"
import { useState } from "react";

export const Editor = ({ token, note, onClose }) => {
    const [title, setTitle] = useState(note ? note.title : null);
    const [content, setContent] = useState(note ? note.content : null);
    const [category, setCategory] = useState(note ? note.category : "D");
    const [done, setDone] = useState(note ? note.done : false);
    const id = note ? note._id : null;

    const saveNote = () => {
        let data = { title, content, category, done };
        if (id) data.noteId = id;

        let params = {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        }

        fetch("https://todoapp-afqp.onrender.com/api/users/user-note", params)
            .then(response => response.json())
            .then(responseData => {
                if (!responseData.success) {
                    alert(responseData.message);
                }
            });
    }

    const deleteNote = () => {
        if (id) {
            fetch("https://todoapp-afqp.onrender.com/api/users/user-note", {
                method: "DELETE",
                body: JSON.stringify({ noteId: id }),
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(responseData => {
                    if (!responseData.success) {
                        alert(responseData.message);
                    }
                });
        }
    }

    return (
        <div className="modal-container">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    saveNote();
                    onClose();
                }}
                className="modal"
            >
                <div className="modal-header">
                    <input
                        type="text"
                        required
                        className="title"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <button className="modal-close" onClick={() => onClose()}>&times;</button>
                </div>
                <textarea
                    rows="5"
                    required
                    className="description"
                    placeholder="Details"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                ></textarea>
                <div className="modal-footer">
                    <div className="toggle-container">
                        <div className="toggle mr10">
                            <label>Important
                                <input
                                    type="checkbox"
                                    checked={category === "A" || category === "B"}
                                    onChange={() => {
                                        category === "A" ? setCategory("C") :
                                            category === "B" ? setCategory("D") :
                                                category === "C" ? setCategory("A") : setCategory("B");
                                    }}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="toggle mr10">
                            <label>Urgent
                                <input
                                    type="checkbox"
                                    checked={category === "A" || category === "C"}
                                    onChange={() => {
                                        category === "A" ? setCategory("B") :
                                            category === "B" ? setCategory("A") :
                                                category === "C" ? setCategory("D") : setCategory("C");
                                    }}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="toggle">
                            <label>Done
                                <input
                                    type="checkbox"
                                    checked={done}
                                    onChange={() => {
                                        setDone(!done);
                                    }}
                                />
                                <span className="slider done-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="modal-save mr10"
                            onClick={() => {
                                deleteNote();
                                onClose();
                            }}
                        >Delete</button>
                        <button
                            type="submit"
                            className="modal-save"
                        >Save</button>
                    </div>
                </div>
            </form >
        </div >
    )
}