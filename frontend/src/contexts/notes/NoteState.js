import React, { useState } from "react";
import NoteContext from './noteContext';

const NoteState = (props) => {
    let host = "http://localhost:5000"

    const [notes, setNotes] = useState([]);

    //GET Notes
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setNotes(json);
    }

    //Add a note
    const addNote = async ({ title, description, tag }) => {
        //API call
        if(tag.length === 0){
            tag = "default";
        }
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json();
        setNotes(notes.concat(note));

    }

    //Delete a note 
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const res = await response.json();
        setNotes(notes.filter((note) => { return note._id !== id }))
    }

    //edit a note
    const editNote = async ({ id, title, description, tag }) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json();
        setNotes(notes.map((note) => {
            if (note._id === id) {
                return {
                    ...note, title, description, tag
                }
            }
            else{
                return note;
            }
        }))
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;