import React, { useState, useEffect } from 'react';
import './Gallery.scss'
import sendRequest from '../../util/sendRequest'
import * as path from '../../constant/path'
import { Link } from 'react-router-dom';

const Gallery = (props) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        sendRequest('/get-all', 'GET', null)
            .then(res => {
                setFiles(res.data)
            })
    }, [])

    const renderCol = () => {
        const listFiles = []
        for (var i = 0; i < files.length; i++) {
            listFiles.push(files[i])
        }
        //sort
        var randomIndex, temp, i = listFiles.length;
        while (--i > 0) {
            randomIndex = Math.floor(i * Math.random());
            if (randomIndex !== i) {
                temp = listFiles[i];
                listFiles[i] = listFiles[randomIndex];
                listFiles[randomIndex] = temp;
            }
        }
        //render
        return listFiles.sort().map((file) => {
            if (file.type == 'image') {
                return (
                    <a href={"/detail/" + file.id}>
                        <img src={path.SERVER_BASE_URL + file.url} className="item"/>
                    </a>
                )
            }
            return (
                <a href={"/detail/" + file.id}>
                    <video controls="controls" className="item">
                        <source src={path.SERVER_BASE_URL + file.url}/>
		            </video>
                </a>
            )
        })
    }
    return (
                    <div className="gallery">
                        <div className="col-1">
                            {renderCol()}
                        </div>
                        <div className="col-1">
                            {renderCol()}
                        </div>
                        <div className="col-1">
                            {renderCol()}
                        </div>
                        <div className="col-1">
                            {renderCol()}
                        </div>
                    </div>
    );
}

export default Gallery;