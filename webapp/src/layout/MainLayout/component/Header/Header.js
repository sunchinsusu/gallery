import React from 'react';
import './Header.scss'
const Header = (props) => {
    const addPhoto=()=>{
        props.changeCallBack()
    }
    return (
        <div className="header">
            <a href="/">Sun Gallery</a>
            <div className="search">
                <input placeholder="Search" />
            </div>
            <img src="/images/logo.png" className="add" onClick={addPhoto}/>
        </div>
    );
}

export default Header;