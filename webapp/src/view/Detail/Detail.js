import React, { useState, useEffect } from 'react';
import './Detail.scss'
import { useParams } from 'react-router-dom';
import Gallery from '../Gallery';
import sendRequest from '../../util/sendRequest';
import * as path from '../../constant/path'

const Detail = (props) => {
    const id = useParams().id;
    const [file, setFile] = useState({})

    useEffect(() => {
        sendRequest('/get/' + id, 'GET', null)
            .then(res => {
                setFile(res.data)
            })
    }, {})

    const renderFile=()=>{
        if (file.type == 'image') {
            return (
                <img src={path.SERVER_BASE_URL + file.url} className="item"/>
            )
        }
        return (
                <video controls className="item" autoPlay src={path.SERVER_BASE_URL + file.url}/>
        )
    }

    return (
        <div className="detail-page">
            <div className="detail-image">
                {renderFile()}
                <div className="des">
                    <div className="date">#{file.date}</div>
                    <a href={path.SERVER_BASE_URL+file.urlDownload} >
                        <img src="/images/download.png" />
                    </a>
                    <p>{file.des}</p>
                </div>
            </div>
            <Gallery />
        </div>
    );
}

export default Detail;