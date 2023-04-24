import "./editor.css"

export const Editor = ({ token, note, onClose }) => {
    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <input type="text" className="title" placeholder="Title" />
                    <button className="modal-close" onClick={() => onClose()}>&times;</button>
                </div>
                <textarea rows="5" className="description" placeholder="Details"></textarea>
                <div className="modal-footer">
                    <div className="toggle">
                        <label>Important
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle">
                        <label>Urgent
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <button className="modal-save">Save</button>
                </div>
            </div>
        </div>
    )
}