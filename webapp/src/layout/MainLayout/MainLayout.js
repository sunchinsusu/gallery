import React, { useState } from 'react';
import {Header} from './component';
import {AddNew} from '../../component'
import './MainLayout.scss'

const MainLayout=(props)=> {
    const [showFormAdd,setShowFormAdd] = useState(false)
    const callBackHandle=()=>{
        setShowFormAdd(!showFormAdd)
    }
    return (
        <div className="layout">
            <Header changeCallBack={callBackHandle}/>
            <div className="page-content">
                {props.children}
            </div>
            <AddNew show={showFormAdd}/>
        </div>
    );
}

export default MainLayout;