import React,{ useContext,useState } from 'react'
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote }=context;
  // Use Change hook for handling onchange function
  const [note, setNote] = useState({title:"",description:"",tag:"default"});

  // Handling Submit Button
  const handleClick=(e)=>{
    e.preventDefault();  // Used to prevemty page reload on submit
    addNote(note.title,note.description,note.tag);
  }
  const onChange=( e)=>{
    // Keeping the previous value of note as same and adding the{ name:value} to it
    setNote({...note,[e.target.name]:e.target.value})

  }
  return (
    <div className="container my-3">
    <h2>Add a Note</h2>
    <form>
        <div className="mb-3 my-3">
            <label htmlform="title" className="form-label" name='title'>Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={ onChange } aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlform="description" className="form-label" name= 'description'>Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={ onChange }/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
    </form>
    </div>
  )
}
export default Addnote