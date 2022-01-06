import React from 'react';
import FileDrop from 'react-file-drop';
import MediaFileBox from './media-file-box'
import MediaUploaderEmpty from './medie-uploader-empty'
import api from '../../../../../api'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


export default class MediaUploader extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            showFileModal: false,
            showFile: {},
            files: props.files.map(file => ({data: file}))
        };
        this.browse = this.browse.bind(this);
    }

    toggleFileModal() {
        this.setState({showFileModal: !this.state.showFileModal})
    }

    onClickFile(file) {
        this.setState({showFile: file.data, showFileModal: true})
    }

    onInputChange(e) {
        this.upload(e.target.files)
    }

    onDrop(files) {
        this.upload(files)
    }

    browse() {
        this.fileInput.click()
    }

    onRemoveFile(index) {
        this.setState(state => {
            state.files[index].previousCrud = state.files[index].data.crud;
            state.files[index].data.crud = 'd';
            this.props.onFilesChange(state.files);
            return state
        })
    }

    undoRemove(index) {
        this.setState(state => {
            state.files[index].data.crud = state.files[index].previousCrud;
            this.props.onFilesChange(state.files);
            return state
        })
    }


    changeDefault(index) {
        this.setState(state => {
            state.files = state.files.map(file => ({...file, data: {...file.data, mainImage: false}}));
            state.files[index].data.mainImage = true;
            if (state.files[index].data.crud !== 'i') state.files[index].data.crud = 'u';
            this.props.onFilesChange(state.files);
            return state
        })
    }

    upload(files) {

        Array.from(files).map(file => {
            let randomId = Math.random();
            this.setState(state => {
                state.files = [...state.files, {
                    id: randomId,
                    file: file,
                    progress: 0,
                    data: null
                }];
                return state
            });
            let form = new FormData();
            form.append('uploadfile', file);

            api.post('images/product/uploadFile', form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(response => {
                this.setState(state => {
                    let fileIndex = state.files.findIndex(file => file.id === randomId);
                    if (fileIndex !== -1) {
                        state.files[fileIndex].data = response.data;
                        state.files[fileIndex].data.crud = 'i';
                    }
                    this.props.onFilesChange(state.files);
                    return state
                })
            }).catch(error => {
                this.setState(state => {
                    let fileIndex = state.files.findIndex(file => file.id === randomId);
                    if (fileIndex !== -1) state.files[fileIndex].error = error.response ? error.response.data : '';
                    return state
                })

            });

        });

    }


    render() {


        return (


            <>
            <FileDrop onDrop={this.onDrop.bind(this)}>
                <div className="media-uploader-container" onChange={this.browse}>


                    <MediaFileBox
                        files={this.state.files}
                        onRemoveFile={this.onRemoveFile.bind(this)}
                        undoRemove={this.undoRemove.bind(this)}
                        onClickAdd={this.browse}
                        onClickFile={this.onClickFile.bind(this)}
                        onChangeDefault={this.changeDefault.bind(this)}
                    />

                    <MediaUploaderEmpty
                        show={!this.state.files.length}
                        onClickBrowse={this.browse}
                    />

                    <input
                        type="file"
                        className="d-none"
                        ref={ e => this.fileInput = e}
                        onChange={this.onInputChange.bind(this)}
                        accept={this.props.accept}
                        multiple
                    />

                </div>

            </FileDrop>


            <Modal isOpen={this.state.showFileModal} toggle={this.toggleFileModal.bind(this)}>
                <ModalHeader>Attribute value</ModalHeader>
                <ModalBody>
                    <img src={this.state.showFile.largeImagePath} width='100%'/>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="default" onClick={this.toggleFileModal.bind(this)}>Close</Button>
                </ModalFooter>
            </Modal>

            </>

        )
    }
}


