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
        setValue("");
    }
   
        return (
            <form 
                className="input-form"
                onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Write now"
                    className="input-form__input"
                    onChange={(e)=>setValue(e.target.value)}
                    value={value}
                />
                <button
                    type="submit"
                    className="input-form__btn">
                    Send
                    </button>
            </form>
        )
    
}
export default connect()(MessageSendForm);