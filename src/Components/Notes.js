import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/noteContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(noteContext);
  let history=useHistory();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else{
      history.push("/login")
    }
    // eslint-disable-next-line
  });
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "", });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, });
  };
  const handelClick = (e) => {
    // console.log("updating the note", note);
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully!","success")

  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label" value={note.etitle}>Title</label>
                  <input type="text" className="form-control" id="etitle" onChange={onChange} minLength={5} required name="etitle" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" value={note.edescription}>Description </label>
                  <input type="text" className="form-control" id="edescription" onChange={onChange} minLength={5} required name="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label" value={note.etag}>Tag</label>
                  <input type="text" className="form-control" id="etag" onChange={onChange} minLength={5} required name="etag" />
                </div>
              </form>
            </div>
            <div className="modal-footer my-2">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handelClick}>Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Save Your Data Here!!</h2>
        <div className="container my-2 mx-2">
          {notes.length === 0 && 'Please add some notes to display!'}
        </div>
        {notes.map((note) => {
          return (<Noteitem key={note._id} updateNote={updateNote} note={note} />);
        })}
      </div>
    </>
  );
};

export default Notes;
