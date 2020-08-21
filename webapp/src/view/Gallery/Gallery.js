import React, { useState, useEffect } from 'react';
import './Gallery.scss'
import sendRequest from '../../util/sendRequest'
import * as path from '../../constant/path'
import { Link } from 'react-router-dom';

const Gallery=(props)=> {
    const [images,setImages] = useState([]);

    useEffect(()=>{
        sendRequest('/get-all', 'GET', null)
            .then(res => {
                console.log(res)
                setImages(res.data)
            })
    },[])

    const renderCol=()=>{
        const listImages = []
        for(var i = 0; i < images.length; i++){
            listImages.push(images[i])
        }
        //sort
        var randomIndex, temp, i = listImages.length;
        while (--i>0) {
            randomIndex = Math.floor(i * Math.random());
            if (randomIndex !== i) {
            temp = listImages[i];
            listImages[i] = listImages[randomIndex];
            listImages[randomIndex] = temp;
            }
        }
        //render
        return listImages.sort().map((image)=>{
            return (
                <a href={"/detail/"+image.id}>
                    <img src={path.SERVER_BASE_URL+image.url} />
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