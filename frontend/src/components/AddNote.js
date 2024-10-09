import React, { useContext, useState } from 'react'
import NoteContext from '../contexts/notes/noteContext'

const AddNote = ({ showAlert }) => {
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({title: "", description:"", tag: ""});
    
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    const handleClick = async (e) => {
        e.preventDefault();
        await addNote(note);
        setNote({title: "", description:"", tag: "default"});
        showAlert("Successfully added a Note", "success")
    }
    return (
        <div className="container my-5">
            <h2>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={note.title} type="text" className="form-control" id="title" name="title" onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input value={ note.tag } type="text" className="form-control" id="tag" name="tag" onChange={onChange}  />
                </div>
                <button disabled={ note.title.length < 5 || note.description.length < 5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote