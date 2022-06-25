import React from 'react';
import Button from '@mui/material/Button';

//npm i express ejs body-parser mongoose multer multer-gridfs-storage gridfs-stream method-override
//

const ImageUploaderForm = () => {
    return(
    <div className="my-4">
        <form  action="http://localhost:3001/api/images/upload" method="post" enctype="multipart/form-data">
            <div >
                <input type="file" name="file" id="file"></input>
                <Button type="submit" variant="contained" color="primary">Upload</Button>
            </div>
        </form>

    </div>)

}

export default ImageUploaderForm;