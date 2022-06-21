import React from 'react';

//npm i express ejs body-parser mongoose multer multer-gridfs-storage gridfs-stream method-override
//

const ImageUploaderForm = () => {
    return(
    <div className="my-4">
        <form  action="http://localhost:3001/upload" method="post" enctype="multipart/form-data">
            <div >
                <input type="file" name="file" id="file"></input>
                <label className='w-full' for="file">Choose File</label>
                <input className='w-full' type="submit" value="Upload" />
            </div>
        </form>

    </div>)

}

export default ImageUploaderForm;