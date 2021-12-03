import React, {Component, useState} from 'react';

import './message-send-form.scss'

const MessageSendForm = () =>{
    const [changeValue, setValueChange] = useState("");
    const onSubmit = (e:any) => {
        e.preventDefault();
        
    }
   
        return (
            <form 
                className="bottom-panel d-flex"
                onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Write now"
                    className="form-control new-post-label"
                    onChange={(e)=>setValueChange(e.target.value)}
                    value={changeValue}
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Send
                    </button>
            </form>
        )
    
}
export default MessageSendForm;