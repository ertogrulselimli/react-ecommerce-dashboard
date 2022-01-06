import React from 'react'
import {Field} from 'formik';
import FieldsErrorMessages from "../../../../../components/validation/FieldsErrorMessages";
import {FormattedMessage} from 'react-intl';
import api from '../../../../../api'


export default class extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isSubmitting: false
        }
    }

    onFileInputChange(mediaType, e) {
        if(this.state.isSubmitting) return false;

        let file = e.target.files[0];

        let form = new FormData();
        form.append('uploadfile', file);
        form.append('mediaType', mediaType);

        this.setState({isSubmitting: true});
        api.post(`images/shop/uploadFile/${mediaType}`, form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            this.setState({isSubmitting: false});

            let media = [...this.props.formik.values.shopMedias];
            let checkIndex = media.findIndex(m => m.mediaType === mediaType);
            if(checkIndex !== -1){
                media[checkIndex] = response.data
            }else{
                media.push(response.data)
            }

            this.props.formik.setFieldValue('shopMedias', media);

            console.log(response.data)
        }).catch(error => {
            this.setState({isSubmitting: false, error: true});
        });

    }



    render() {

        const logo = this.props.formik.values.shopMedias.find(m => m.mediaType === 'LOGO');
        const cover = this.props.formik.values.shopMedias.find(m => m.mediaType === 'COVER');

        console.log(this.props)

        return (
            <div className="row mt-3">
                <div className="col-6">
                    <div className="row">
                        <div className="col-3">
                            <div className="text-center mb-2" style={{border: '1px dashed #c8ced3', height: '150px', width: '150px'}}>
                                <img src={logo ? logo.mediaPath: ''} style={{maxHeight: '148px', maxWidth: '148px'}}/>
                            </div>
                            <button
                                className="btn btn-default btn-sm"
                                type="button"
                                onClick={() => this.logoInput.click()}>
                                Change logo
                            </button>
                        </div>

                        <div className="col-12 mt-3">
                            <div className="text-center mb-2" style={{border: '1px dashed #c8ced3', height: '180px'}}>
                                <img src={cover ? cover.mediaPath: ''} style={{maxHeight: '100%', maxWidth: '100%'}}/>
                            </div>
                            <p>
                                <button
                                    className="btn btn-default btn-sm"
                                    type="button"
                                    onClick={() => this.coverInput.click()}>
                                    Change cover image
                                </button>
                            </p>
                        </div>
                    </div>

                    <input
                        type="file"
                        onChange={this.onFileInputChange.bind(this, 'LOGO')}
                        className="d-none"
                        ref={e => this.logoInput = e}
                    />
                    <input
                        type="file"
                        onChange={this.onFileInputChange.bind(this, 'COVER')}
                        className="d-none"
                        ref={e => this.coverInput = e}
                    />
                </div>
            </div>
        )
    }

}