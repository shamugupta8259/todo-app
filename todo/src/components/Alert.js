import React, { useContext } from 'react'

import AlertContext from '../context/notes/AlertContext';
const Alert = () => {
    const alertContext = useContext(AlertContext);
    const {type,msg}=alertContext;
    const capitalize=(word)=>{
        if (word==="danger") {
            word="Error";
        }
        else{
            word="success";
        }
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+ lower.slice(1);
    }
    return (
        msg!==null&&(
        <div style={{height:'50px' }}>
            { <div className={`alert alert-${type}`} role="alert">
                <strong>{capitalize(type)}</strong>: {msg}
                </div>}
        </div>
        )
    )
}

export default Alert
