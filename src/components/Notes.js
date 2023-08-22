import React, { useContext, useEffect,useState,useRef } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitems from './Noteitems';
import Addnote from './Addnote';




const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        getNotes();
    }, [getNotes]);

    // Use State Hook
    const [note, setNote] = useState({eid:"",etitle:"",edescription:"",etag:""});
    // Use Ref Hook for opening edit modal dynamically using js
    const ref = useRef(null)
    // Use ref Hook for clicking on close button dynamically when someone clicks update button of modal
    const refClose = useRef(null)


//Handling Submit Button
    const handleClick= async () =>{
    editNote(note.eid,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully","success");
    // addNote(note.etitle,note.edescription,note.etag);
  }



  const onChange=(e)=>{
    // Keeping the previous value of note as same and adding the{ name:value} to it
    setNote({...note,[e.target.name]:e.target.value});

  }
//   Handling Update note function
const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({eid:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
}

    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button type="button"  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* We cant remove Launch Demo button bcz we copy from bootstyrap js */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlform="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" minLength={5} required name="etitle" value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlform="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" minLength={5} required name="edescription" value={ note.edescription } onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlform="tag" className="form-label" value={note.etag} >Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"  disabled={ note.etitle.length<5 || note.edescription.length <5 } onClick={handleClick} >Update </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container h6">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((notes) => {
                    return <Noteitems key={notes._id}  showAlert={props.showAlert}  updatenote={updateNote} note={notes} />;
                })}
            </div>
        </>
    )
}

export default Notes
