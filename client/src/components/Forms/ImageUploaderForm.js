import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useContext } from 'react';
import { ImageContext } from '../../contexts/ImageContext';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//npm i express ejs body-parser mongoose multer multer-gridfs-storage gridfs-stream method-override
//https://stackoverflow.com/questions/62976020/passing-react-values-from-child-to-parent

const ImageUploaderForm = () => {
    const [file, setFile] = useState(null)
    const [inputContainsFile, setInputContainsFile] = useState(false)
    const [imageId, setImageId] = useState(null)
    const { imageIDs, addImageID } = useContext(ImageContext)

    const handleFile = (event) => {
        setFile(event.target.files[0]);
        setInputContainsFile(true)
    }

    const fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('file', file, file.name)
        axios.post("http://localhost:3001/api/images/upload", fd).then(({ data }) => {
            setImageId(data)
            console.log(data)
            //setImageId(state=> [...state,data])
            addImageID(data)

            setFile(null)
            setInputContainsFile(false)
        }).catch((error) => {
            console.log(error)
        })

    }

    return (
        <div className="my-4">
            <div >
                <input type="file" name="file" id="file" onChange={handleFile}></input>
                {file ? <Button variant="contained" color="primary" onClick={() => {
                    if (inputContainsFile) {
                        fileUploadHandler()
                    }
                }}>Upload</Button> : null}
            </div>
            <div>
                {imageIDs.length > 0 ? ( 
                    <>
                        <ImageList sx={{ width: 1000, height: 400 }} cols={3} rowHeight={300}>
                            {imageIDs.map((id) => (
                                <ImageListItem key={id}>
                                    <img
                                        src={`http://localhost:3001/api/images/${id}?w=164&h=164&fit=crop&auto=format`}
                                        alt="image"
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </>
                ) :
                    (<></>)}

            </div>
        </div>)

}

export default ImageUploaderForm;