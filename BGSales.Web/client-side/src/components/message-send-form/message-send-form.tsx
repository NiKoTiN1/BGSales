import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {sendMessage} from "../../actions";
import './message-send-form.scss'

interface Props{
    userId: string;
    chatId:string;
    dispatch:Function;
}

const MessageSendForm = ({userId, chatId, dispatch}: Props) =>{
    const [value, setValue] = useState("");
    const onSubmit = (e:any) => {
        e.preventDefault();
        dispatch(sendMessage(userId, value, chatId,));
    }
   
        return (
            <form 
                className="bottom-panel d-flex"
                onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Write now"
                    className="form-control new-post-label"
                    onChange={(e)=>setValue(e.target.value)}
                    value={value}
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Send
                    </button>
            </form>
        )
    
}
export default connect()(MessageSendForm);