import React from 'react';
import MediaUploader from '../media-upload/media-uploader';




export default ({formik, files}) => (

    <div className="row">
        <div className="col-12">

            <MediaUploader
                files={files || []}
                onFilesChange={files => {
                    console.log(files)
                    formik.setFieldValue('productMedias', files)
                }}
            />
        </div>
    </div>

)

