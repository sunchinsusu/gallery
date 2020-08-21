import React, { useState } from 'react';
import './AddNew.scss'
import axios from 'axios';
import * as path from '../../constant/path'

const AddNew = (props) => {

    const [file, setFile] = useState(null)
    const [des, setDes] = useState("")

    const changeFile = (event) => {
        setFile(event.target.files[0])
        console.log(event.target.files[0])
    }

    const changeDes = (event) => {
        setDes(event.target.value)
        console.log(event.target.value)
    }

    const upload = (event) => {
        var formData = new FormData();
        formData.append("file",file)
        formData.append("des",des)
        var url = path.SERVER_BASE_URL+'/upload-one-file'
        axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                alert("Upload successfuly!")
                setFile(null)
                setDes("")
                window.location.href="/"
            })
            .catch(error => {
                alert("Bad :(((((")
            });
    }

    if (props.show === true) {
        return (
            <div className="add-new">
                <p>Add Photo</p>
                <div className="form">
                    <input type="file" name="file" onChange={changeFile} />
                    <textarea name="des" value={des} onChange={changeDes}></textarea>
                    <button onClick={upload}>Upload</button>
                </div>
            </div>
        );
    }
    else
        return (
            <>
            </>
        );
}

export default AddNew;