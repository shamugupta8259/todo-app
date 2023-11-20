 import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/notes/AlertContext';
 
 const AddNote = () => {
  const context = useContext(NoteContext);
  const alertcontext=useContext(AlertContext);
  const {addNote } = context;
  
  const [note,setNote]=useState({title : "" , description : "" , tag : ""});

    const handleClick=(e)=>{
        e.preventDefault();
        // console.log(note)
         addNote(note.title,note.description,note.tag);
         alertcontext.show("primary","The note has been successfully added");
         setNote({title : "" , description : "" , tag : ""});

    }
    const onChange=(e)=>{
        // spread operator ka use ho rahe ha aur  yahe target kar rahe ha 
        // name sa aur name update hona ma madad kar rahe ha 
         setNote({...note,[e.target.name]:e.target.value})
    }
   return (
     <div className='my-3'>
      <h2>Add a note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' minLength={5} value={note.title} required onChange={onChange}  />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description"  name='description' value={note.description} minLength={5} required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag"  name='tag' minLength={5}  value={note.tag}required onChange={onChange} />
        </div>
       
        <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>

     </div>
   )
 }
 
 export default AddNote
 