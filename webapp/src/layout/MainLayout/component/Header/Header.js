import React, { useState } from 'react';
import './Header.scss'
import sendRequest from '../../../../util/sendRequest';
const Header = (props) => {
    const [key,setKey]=useState("")
    const addPhoto=()=>{
        props.changeCallBack()
    }
    const changeKey=(event)=>{
        setKey(event.target.value)
    }
    const searchHandle=()=>{
        sendRequest("/search/"+key,"GET",null)
        .then(res=>{
            console.log(res.data)
        })
    }
    return (
        <div className="header">
            <a href="/">Sun Gallery</a>
            <div className="search">
                <input placeholder="Search" onBlur={searchHandle} onChange={changeKey}/>
            </div>
            <img src="/images/logo.png" className="add" onClick={addPhoto}/>
        </div>
    );
}

export default Header;