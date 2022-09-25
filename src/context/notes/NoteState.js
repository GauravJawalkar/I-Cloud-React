
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get Notes from Backend
  const getNotes =async () => {
    // API Call to fetch all notes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
  
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    });
      const json=response.json();
      // console.log(json);
      // setNotes(json)
  }
  // API call to backend
  
  // Function to Add a note from client
  const addNote =async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
  
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({title,description,tag})
    });

    const note=await response.json();
    setNotes(notes.concat(note))
   
  }

  // Function to Delete a note 
  const deleteNote = async(id) => {

    // API call to the backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Function to Edit a note 
  const editNote = async (id, title, description, tag) => {
    // API call to backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')

      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);

    let newNotes=JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;