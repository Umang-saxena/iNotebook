import React, { useContext, useEffect,useState,useRef } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitems from './Noteitems';
import Addnote from './Addnote';




const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes,addNote } = context;
    useEffect(() => {
        getNotes();
    }, []);
    // Use State Hook
    const [note, setNote] = useState({etitle:"",edescription:"",etag:""});
    // Use Ref Hook for opening edit modal dynamically using js
    const ref = useRef(null)

//Handling Submit Button
    const handleClick=(e)=>{
    console.log("Updating Note .....");
    console.log(note);
    e.preventDefault();  // Used to prevemty page reload on submit
    // addNote(note.title,note.description,note.tag);
  }
  const onChange=(e)=>{
    // Keeping the previous value of note as same and adding the{ name:value} to it
    setNote({...note,[e.target.name]:e.target.value});

  }
//   Handling Update note function
const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
}

    return (
        <>
            <Addnote />
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
                                    <input type="text" className="form-control" id="etitle"   name="etitle" value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlform="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={ note.edescription } onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlform="tag" className="form-label" value={note.etag} >Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} >Update </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((notes) => {
                    return <Noteitems key={notes._id}  updatenote={updateNote} note={notes} />;
                })}
            </div>
        </>
    )
}

export default Notes
