import React, { useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handelClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully!","success")
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
        <div className='container my-3'>
            <h2>I-Cloud Database Services</h2>
            <form className='my-2'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" onChange={onChange} value={note.title} minLength={5} required name="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" onChange={onChange} value={note.description} minLength={5} required name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" onChange={onChange} value={note.tag} minLength={5} required name="tag" />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handelClick}>Add Data!</button>
            </form>
        </div>
        </>
    )
}

export default AddNote
