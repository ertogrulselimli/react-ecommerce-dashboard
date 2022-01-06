import React from 'react';
import CenterCircularProgress from '../../../../../components/ui-elements/center-circular-progress';
import MediaFile from './media-file'
import MediaDeletedLayer from './media-deleted-layer'


export default props => {
    if (!props.files.length) return null;

    return (
        <>
        {
            props.files.map((file, key) => (
                <div className="file-box" key={key}>
                    <MediaFile
                        index={key}
                        show={file.data}
                        file={file}
                        onRemoveFile={props.onRemoveFile}
                        onChangeDefault={props.onChangeDefault}
                        onClickFile={e => {props.onClickFile(file)}}
                    />
                    <CenterCircularProgress show={!file.data} size="32" borderSize="4"/>
                    <MediaDeletedLayer
                        show={file.data && file.data.crud === 'd'}
                        undo={e => props.undoRemove(key)}
                    />
                </div>

            ))
        }
        <div className="file-box add" onClick={props.onClickAdd}>
            +
        </div>
        </>
    )
};

