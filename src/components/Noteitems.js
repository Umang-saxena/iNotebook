import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";


const Noteitems = (props) => {
    const { note,updatenote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3" >
            <div className="card" style={{ "width": "18rem" }} >
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title" style={{ "fontSize": "20px" }}>{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-pen mx-2" onClick={()=>{updatenote(note)}} ></i>
                    </div>
                    <p className="card-text" style={{ "fontSize": "16px" }}>{note.description} </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
