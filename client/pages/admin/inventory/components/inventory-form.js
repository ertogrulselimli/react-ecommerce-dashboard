import React from 'react'
import FieldsErrorMessages from "../../../../components/validation/FieldsErrorMessages";
import {TabContent, TabPane, Nav, NavItem, NavLink, Alert} from 'reactstrap';
import classnames from 'classnames';
import {injectIntl, FormattedMessage, defineMessages} from 'react-intl';
import {Field, Formik, FieldArray} from 'formik';
import * as yup from 'yup'
import validationMessages from '../../../../messages/validation'

class InventoryForm extends React.Component {


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };

        this.validation = yup.object().shape({
            code: yup.string().required(props.intl.formatMessage(validationMessages.required)),
            name: yup.string().required(props.intl.formatMessage(validationMessages.required)),
        })
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    submit(values) {
        this.props.onSubmit(values)
    }


    render() {

        const initalData = this.props.formData;

        return (


            <Formik
                initialValues={{
                    warehouseId: initalData.warehouseId,
                    code: initalData.code || '',
                    name: initalData.name || '',
                    city: initalData.city || '',
                    countryCode: initalData.countryCode || '',
                    defaultBackorderStockLeadTime: initalData.defaultBackorderStockLeadTime || 0,
                    defaultStandardStockLeadTime: initalData.defaultStandardStockLeadTime || 0,
                    displayName: initalData.displayName || '',
                    multipleShippingSupported: initalData.multipleShippingSupported || false,
                    description: initalData.description || '',
                    postcode: initalData.postcode || '',
                    shopCode: initalData.shopCode || '',
                    stateCode: initalData.stateCode || '',
                }}
                onSubmit={this.submit.bind(this)}
                validationSchema={this.validation}
            >
                {
                    (props) => {
                        this.props.bindSubmit(props.handleSubmit);

                        return (
                            <form onSubmit={props.handleSubmit}>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.activeTab === '1'})}
                                            onClick={this.toggle.bind(this, '1')}
                                        >
                                            <FormattedMessage id="common.main_information" defaultMessage="Main"/>
                                        </NavLink>
                                    </NavItem>
                                </Nav>


                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <div className="row mt-3">
                                            <div className="col-6">

                                                <div className="form-group" style={{display: this.props.auth.isShopOwner() ? 'block': 'none'}}>
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.shop_code.label"
                                                                          defaultMessage="Shop"/>
                                                    </label>
                                                    <Field component="select" name="shopCode"
                                                           className="form-control">
                                                        <option value=""/>
                                                        {
                                                            this.props.shops.map((shop, key) => (
                                                                <option value={shop.code}
                                                                        key={key}>{shop.name}</option>
                                                            ))
                                                        }
                                                    </Field>

                                                    <FieldsErrorMessages
                                                        show={props.errors.shopCode}
                                                        messages={[props.errors.shopCode]}
                                                    />
                                                </div>


                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.code.label"
                                                                          defaultMessage="Code"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="code"
                                                    />

                                                    <FieldsErrorMessages
                                                        show={props.errors.code}
                                                        messages={[props.errors.code]}
                                                    />
                                                </div>


                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.name.label"
                                                                          defaultMessage="Name"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                    />

                                                    <FieldsErrorMessages
                                                        show={props.errors.name}
                                                        messages={[props.errors.name]}
                                                    />
                                                </div>



                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.display_name.label"
                                                                          defaultMessage="Display name"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="displayName"
                                                    />
                                                </div>


                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.postcode.label"
                                                                          defaultMessage="Postcode"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="postcode"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.stateCode.label"
                                                                          defaultMessage="State code"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="stateCode"
                                                    />
                                                </div>


                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.city.label"
                                                                          defaultMessage="City"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="city"
                                                    />

                                                </div>


                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.countryCode.label"
                                                                          defaultMessage="Country code"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="countryCode"
                                                    />

                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.default_backorder_stock_lead_time.label"
                                                                          defaultMessage="Default backorder stock lead time"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="defaultBackorderStockLeadTime"
                                                    />

                                                </div>


                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage
                                                            id="inventory.form.default_standard_stock_lead_time.label"
                                                            defaultMessage="Default standard stock lead time"
                                                        />
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="defaultStandardStockLeadTime"
                                                    />
                                                </div>



                                                <div className="form-check">
                                                    <Field
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        name="multipleShippingSupported"
                                                        id="multipleShippingSupported"
                                                        checked={props.values.multipleShippingSupported}
                                                    />
                                                    <label className="form-check-label" htmlFor="multipleShippingSupported">
                                                        <FormattedMessage id="product_type.attribute.form.multiple_shipping_supported.label"
                                                                          defaultMessage="Multiple shipping supported"/>
                                                    </label>

                                                </div>

                                                
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="inventory.form.description.label"
                                                                          defaultMessage="Description"/>
                                                    </label>
                                                    <Field
                                                        component='textarea'
                                                        type="text"
                                                        className="form-control"
                                                        name="description"
                                                    />


                                                </div>

                                            </div>
                                        </div>
                                        <button className="hidden" type="submit" style={{display: 'none'}}/>
                                    </TabPane>




                                </TabContent>
                            </form>
                        )
                    }
                }
            </Formik>
        )
    }
}


export default injectIntl(InventoryForm);
