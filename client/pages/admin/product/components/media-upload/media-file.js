import React from 'react';


export default props => {
    if (!props.show) return null

    return (
        <>
        <i className="fa fa-times delete-icon" onClick={e => props.onRemoveFile(props.index)}/>
        <img src={props.file.data.mediumImagePath} onClick={props.onClickFile}/>
        <div className="footer">
            <label htmlFor={`make_default${props.index}`}>
                <input
                    type="radio"
                    id={`make_default${props.index}`}
                    checked={props.file.data.mainImage}
                    onChange={e => {
                        e.stopPropagation();
                        props.onChangeDefault(props.index)
                    }}/> main

            </label>
        </div>
        </>
    )
};
