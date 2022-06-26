import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';

//npm i express ejs body-parser mongoose multer multer-gridfs-storage gridfs-stream method-override
//

const ImageUploaderForm = () => {
    const [file,setFile] = useState(null)
    const [inputContainsFile,setInputContainsFile] = useState(false)
    const [imageId, setImageId] = useState(null)

    const handleFile = (event) => {
        setFile(event.target.files[0]);
        setInputContainsFile(true)
    }

    const fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('file', file, file.name)
        axios.post("http://localhost:3001/api/images/upload",fd).then(({data}) => {
            setImageId(data)
            //setImageId(state=> [...state,data])
            setFile(null)
            setInputContainsFile(false)
        }).catch((error)=> {
            console.log(error)
        })

    }

    return(
    <div className="my-4">
            <div >
                <input type="file" name="file" id="file" onChange={handleFile} ></input>
                {file? <Button variant="contained" color="primary" onClick={() => {
                    if(inputContainsFile){
                        fileUploadHandler()
                    }
                }}>Upload</Button>: null }
            </div>
            <div>
                {imageId? (
                    <>
                    {
                    <img src={`http://localhost:3001/api/images/${imageId}`} alt="image"></img>
                    }
                    </>
                ): 
                (<></>)}

            </div>
    </div>)

}

export default ImageUploaderForm;