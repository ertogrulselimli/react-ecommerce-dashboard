import React from 'react'

export default props => {
    if (!props.show) return null;
    return (
        <div className="text-center" style={{flex: 1, padding: '15px 0'}}>
            <h5>Drop file here or browse to upload.</h5>
            <button
                type="button"
                onClick={props.onClickBrowse}
                className="btn btn-default" style={{marginTop: '10px'}}
            >
                browse <span className="fa fa-upload"/>
            </button>
        </div>
    )
};
