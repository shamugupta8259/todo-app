import React, { useState } from 'react'
import AlertContext from './AlertContext'
const AlertState = (props) => {

    const [type, setType] = useState(null);
    const[msg, setMsg] = useState(null);
    const clear = () => {
        setType(null);
        setMsg(null);
    }
    const show = (text, message) => {
        setType(text);
        setMsg(message);
        setTimeout(() => {
            clear();
        }, 3000);
    }
    
return (
    <AlertContext.Provider value={{show,clear,type,msg}}>
        {props.children}
    </AlertContext.Provider>
)
}

export default AlertState
