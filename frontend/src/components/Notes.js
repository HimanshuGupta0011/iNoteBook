import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../contexts/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = ({ showAlert }) => {
  const { notes, getNotes, editNote } = useContext(NoteContext)
  const ref = useRef('');
  const refClose = useRef('');
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    } else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])


  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

  const updateNote = (cnote) => {
    ref.current.click();
    setNote({ id: cnote._id, etitle: cnote.title, edescription: cnote.description, etag: cnote.tag });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault();
    editNote({ id: note.id, title: note.etitle, description: note.edescription, tag: note.etag })
    showAlert("Successfully Note Updated!", 'success')
    refClose.current.click();
  }
  return (
    <>
      {/* Add Note Component */ }
      <AddNote showAlert={showAlert}/>

      {/*Modal for updating Note*/}
      <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/*Notes Display*/}
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="conatiner">
          {notes.length === 0 && "No Notes To Show"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert}/>;
        })}
      </div>
    </>
  )
}

export default Notes