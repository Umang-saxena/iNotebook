import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState=( props )=>{
    const s1={
        "Name":"Umang",
        "Class":"5B"
    }
    const [state,setState]=useState(s1);
    const update=()=>{
        setTimeout(() => {
            setState(
                {
                    "Name":"Hanu Saxena",
                    "Class":"10A"
                }
            )
        }, 1000);
    }

    return (
            <NoteContext.Provider value={{state,update}} >  {/* It is same as value={{state:state,update:update}} */}
                { props.children }
            </NoteContext.Provider>

    )
}
export default NoteState;