import React, { useContext, useEffect, useRef,useState} from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import AlertContext from '../context/notes/AlertContext';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
  const alertcontext=useContext(AlertContext);
  const navigate=useNavigate();
  {/* map function ka use kar raeh ha hum yahe par */ }
  const context = useContext(NoteContext);
  const { notes, getnotes,editNote} = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'))
      getnotes();
    }
    else{
      navigate('/login');
    }
   
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note,setNote]=useState({id: "", etitle : "" , edescription : "" , etag : ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  // const {addNote } = context;
  
 
    const handleClick=(e)=>{
      // console.log("updating note",note)
      editNote(note.id,note.etitle,note.edescription,note.etag)
     refClose.current.click();
     alertcontext.show("success","The notes has been successfully updated")
        e.preventDefault();
        //  addNote(note.title,note.description,note.tag);

    }
    const onChange=(e)=>{
        // spread operator ka use ho rahe ha aur  yahe target kar rahe ha 
        // name sa aur name update hona ma madad kar rahe ha 
         setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
      <AddNote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">edit notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <h2>Add a note</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle'  minLength={5} required onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' minLength={5} required value={note.edescription} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag}  onChange={onChange} />
                  </div>

                </form>

              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} className="btn btn-primary">UPDATE NOTES</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your notes</h2>
        <div>
          {notes.length===0 && 'NO NOTES TO DISPLAY'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>
    </>

  )
}

export default Notes
