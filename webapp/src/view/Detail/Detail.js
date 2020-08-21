import React, { useState, useEffect } from 'react';
import './Detail.scss'
import { useParams } from 'react-router-dom';
import Gallery from '../Gallery';
import sendRequest from '../../util/sendRequest';
import * as path from '../../constant/path'

const Detail = (props) => {
    const id = useParams().id;
    const [image, setImage] = useState({})

    useEffect(() => {
        sendRequest('/get/' + id, 'GET', null)
            .then(res => {
                setImage(res.data)
            })
    }, {})

    return (
        <div className="detail-page">
            <div className="detail-image">
                <img src={path.SERVER_BASE_URL + image.url} />
                <div className="des">
                    <p>{image.des}</p>
                </div>
            </div>
            <Gallery />
        </div>
    );
}

export default Detail;