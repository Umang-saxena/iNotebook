import React,{ useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitems from './Noteitems';



const Notes = () => {
    const context = useContext(noteContext);
    const { notes,setNotes }=context;
    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((notes) => {
                return <Noteitems key={ notes._id } note={ notes } />;
            })}
        </div>
    )
}

export default Notes
