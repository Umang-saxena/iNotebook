// import { useState } from 'react'
import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const host = "http://localhost:5000";    // creating a variable for api call to work easily 

  const notesInitial = [
    {
      "_id": "64d77986d440cc4c72b3387105",
      "user": "64d3e807843b2d81d49a2dca",
      "title": "My Title",
      "description": "Fguyjgte",
      "tag": "Personal",
      "date": "2023-08-12T12:22:30.102Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial);

  // Get All Notes
  const getNotes = async () => {
    //  TODO Api Call Pending
    const url = host + `/api/notes/fetchallnotes`;
    // API CALL 
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDNlODA3ODQzYjJkODFkNDlhMmRjYSIsImlhdCI6MTY5MTgyMjQ0N30.hjDwoEgB8ZcYvQ-Z6Nj2fqDYj4cCJevp1-Qnteqbkis'
        },
      });
      const json = await response.json();
      // console.log(json);
      setNotes(json);
      
    } catch (error) {
      console.log("Error" ,error);
    }
  }


  // Add a Note
  const addNote = async (title, description, tag) => {
    //  TODO Api Call Pending
    const url = host + `/api/notes/addnote`;
    // API CALL 
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDNlODA3ODQzYjJkODFkNDlhMmRjYSIsImlhdCI6MTY5MTgyMjQ0N30.hjDwoEgB8ZcYvQ-Z6Nj2fqDYj4cCJevp1-Qnteqbkis'
        },
        body: JSON.stringify({title,description,tag})
      });
      const note= await response.json();
      setNotes(notes.concat(note));
    
    } catch (error) {
      console.log("Error" ,error);
    }
  }

  // Delete a Note
  const deleteNote = async(id) => {

    // Deleting from database
    const url = host + `/api/notes/deletenote/${id}`;
    // API CALL 
    try {
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDNlODA3ODQzYjJkODFkNDlhMmRjYSIsImlhdCI6MTY5MTgyMjQ0N30.hjDwoEgB8ZcYvQ-Z6Nj2fqDYj4cCJevp1-Qnteqbkis'
        },
      });
      const json = response.json();
      console.log(json);  
      // Deleting from Clients Side
      console.log("Deleting note with id" + id);
      const newNote = notes.filter((note) => { return note._id !== id });
      setNotes(newNote);
    } catch (error) {
      console.log("Error" ,error);

    }
  }



  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = host + `/api/notes/updatenote/${id}`;
    // API CALL
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDNlODA3ODQzYjJkODFkNDlhMmRjYSIsImlhdCI6MTY5MTgyMjQ0N30.hjDwoEgB8ZcYvQ-Z6Nj2fqDYj4cCJevp1-Qnteqbkis'
        },
        body: JSON.stringify({title,description,tag})
      });
      const json=await response.json();
      console.log(json);

  
      // Logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          notes[index].title = title;
          notes[index].description = description;
          notes[index].tag = tag;
        }
      }
    } catch (error) {
      console.log("Error" ,error);
    } }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }} >
      {props.children}
    </NoteContext.Provider>

  )
}
export default NoteState;