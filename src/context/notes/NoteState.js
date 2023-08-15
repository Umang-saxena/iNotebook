// import { useState } from 'react'
import React ,{useState} from 'react'
import NoteContext from './noteContext'

const NoteState=( props )=>{
   const notesInitial=[
    {
      "_id": "64d77986d440cc4c72b87105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64db393393da98a924bf6eaa",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-15T08:37:07.278Z",
      "__v": 0
    },
    {
      "_id": "64db393c93da98a924bf6ead",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-15T08:37:16.332Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)
    return (
            <NoteContext.Provider value={{ notes,setNotes }} > 
                { props.children }
            </NoteContext.Provider>

    )
}
export default NoteState;