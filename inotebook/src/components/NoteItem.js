import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/notes/AlertContext';

const NoteItem = (props) => {
    const { note,updateNote } = props;
    const context=useContext(NoteContext);
    const alertcontext=useContext(AlertContext);
    const {deleteNote}=context;
    return (
        <div className='col-md-3' key={note._id}>
            <div className="card my-3">
                    <div className="card-body">

                   <div className='d-flex align-items-centerf'>
                   <h5 className="card-title">{note.title}</h5>

                        <i className="fa-solid fa-pen-to-square mx-2"  onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{ alertcontext.show("success","The note has been successfully deleted"); deleteNote(note._id)}}></i>
                        
                   </div>
                        <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
// flex-row-reverse