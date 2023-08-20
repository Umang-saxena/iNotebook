import React,{ useContext,useState } from 'react';
import noteContext from "../context/notes/noteContext";
// import Notes from './Notes';

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote }=context;
  // Use Change hook for handling onchange function
  const [note, setNote] = useState({title:"",description:"",tag:""});

  // Handling Submit Button
  const handleClick=(e)=>{
    e.preventDefault();  // Used to prevemty page reload on submit
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});   

  }
  const onChange=(e)=>{
    // Keeping the previous value of note as same and adding the{ name:value} to it
    setNote({...note,[e.target.name]:e.target.value});

  }
  return (
    <div className="container my-3">
    <h2>Add a Note</h2>
    <form>
        <div className="mb-3 my-3">
            <label htmlform="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={ onChange } aria-describedby="emailHelp" minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlform="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={ onChange } minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlform="tag" className="form-label" >Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={ onChange }/>
        </div>
        <button disabled={ note.title.length<5 || note.description.length <5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
    </div>
  )
}
export default Addnote