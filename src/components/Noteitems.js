import React from 'react'

const Noteitems = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3" >            
            <div className="card" style={{"width":"18rem"}} >
                <div className="card-body">
                    <h5 className="card-title" style={{"fontSize":"20px"}}>{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Your Note</h6>
                    <p className="card-text" style={{"fontSize":"16px"}}>{note.description} </p>
                    <i className="fa-solid fa-trash mx-2"></i>
                    <i className="fa-solid fa-pen mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
