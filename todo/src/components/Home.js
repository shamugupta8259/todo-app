import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = () => {

  const val=useContext(NoteContext);
  const {notes,setNotes}=val;
  // console.log(notes);
  return (
    <div>
    <Notes/>
    </div>
  )
}

export default Home
