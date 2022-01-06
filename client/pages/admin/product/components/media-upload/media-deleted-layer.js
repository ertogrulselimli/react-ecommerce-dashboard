import React from 'react';


export default props => {
    if (!props.show) return null;

    return (
        <div className="media-uploader-deleted">
            <i className="fa fa-undo" onClick={props.undo} />
        </div>
    )
};