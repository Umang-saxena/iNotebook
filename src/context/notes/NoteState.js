// import { useState } from 'react'
import React ,{useState} from 'react'
import NoteContext from './noteContext'

const NoteState=( props )=>{
   const notesInitial=[
    {
      "_id": "64d77986d440cc4c72b3387105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64d77986d440c3c4c72b87105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64d77986d43340cc4c72b87105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64d77986d2440cc4c72b87105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64d77986d440cc4c72b63287105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64d77986d440cc4c72b817105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64d77986d440cc4c7332b687105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64d77986d440cc4c72b687105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    },
    {
      "_id": "64db393393da984a924bf6eaa",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-15T08:37:07.278Z",
      "__v": 0
    },
    {
      "_id": "64db393c93da9ede8a9245bf6ead",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-15T08:37:16.332Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const addNote = ( title,description,tag )=>{
    //  TODO Api Call Pending
    const note= {
      "_id": "64db393c93da98a9245bf6ead",
      "user": "64d3e807843b2d81d49a2dca",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-08-15T08:37:16.332Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }

  // Delete a Note
const deleteNote = ()=>{

    
  }

  // Edit a note
  const editNote = ()=>{

    
  }


    return (
            <NoteContext.Provider value={{ notes,addNote,deleteNote,editNote }} > 
                { props.children }
            </NoteContext.Provider>

    )
}
export default NoteState;