/**
 * Created by Administrator on 4/10/2019.
 */
import React from "react";
import { injectIntl} from "react-intl";
import MXReacTable2 from "./mx-dropdown-react-table";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import PropTypes from "prop-types";

// We are not gonna send formik here because every time formik change forces this component to update ,
//since this should be independent and reusable component not to be depend on formik


class MXDropDownFormikInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [
        {
          id: "active",
          value: { value: "YES", label: "Yes" }
        }
      ],

      dropdownOpen: false,
      isRowClicked: false,
      mxvalue: "",
    };

    this.dropdown = React.createRef();
    this.mxTextInputRef = React.createRef();
    this.dropDownMenuRef = React.createRef();
    this.mxReactTableRef = React.createRef();

    this.handleMXTextBlur = this.handleMXTextBlur.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onMXTextFilterChange = this.onMXTextFilterChange.bind(this);
    this.onClickRow = this.onClickRow.bind(this);
    this.filterUrl = props.filterUrl; //This is for on Fetch Data
    this.mxTxtChangeTimout = false;

  }

  onClickRow(row) {
    this.setState({
      dropdownOpen: false,
      isRowClicked: true,
      mxvalue: row.original.description
    });
    this.onSelectEntity(row.original);
  }

  onSelectEntity(row){
    this.props.formik.setFieldValue(fieldId,row.id);
    this.props.formik.setFieldValue(fieldDescription,row.description);
  }

  onMXTextFilterChange(e) {
    let value = e.target.value;
    if (this.mxTxtChangeTimout) clearTimeout(this.mxTxtChangeTimout);
    this.setState({ mxvalue: value });
    this.mxTxtChangeTimout = setTimeout(() => {
      if (!this.state.dropdownOpen) {
        this.setState({ dropdownOpen: true });
      }
      this.mxReactTableRef.current.onChangeFilter(value);
    }, 30);
  }


  handleMXTextBlur(e) {
    if (
      e.relatedTarget === this.dropdown.current ||
      this.dropdown.current.contains(e.relatedTarget)
    ) {
      this.mxTextInputRef.current.focus();
      return;
    } else if (!this.state.isRowClicked) {
      this.setState({ mxvalue: "" });
    }
  }




  toggle(e) {
    const portal = document.getElementById("portal-target");
    if (
      this.state.dropdownOpen &&
      (e.target === portal.current || portal.contains(e.target))
    )
      return;
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  ///Lifecycle methods ..........
  componentWillUnmount() {
    clearTimeout(this.mxTxtChangeTimout);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps){
      this.setState({mxvalue:nextProps.value})
      if(this.wTimeout) clearTimeout(this.wTimeout);
      this.wTimeout=setTimeout(()=>{
          this.mxReactTableRef.current.onChangeFilter(nextProps.value);
      },10)
  }


  render() {

    console.log('render of mx dropdown field input')
      console.log(this.state.mxvalue);
    if (this.props.showInput === false) {
      return null;
    }
    return (
      <div ref={this.dropdown} className="">
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          size="lg"
        >
          <div className={this.props.divClassName || "form-group"}>
            <label className={this.props.labelClassName || "control-label"}>
              {this.props.intl.formatMessage({
                id: this.props.intlMessageId,
                defaultMessage: this.props.intlDefaultMessage
              })}
            </label>
            <DropdownToggle tag={"div"} color="default">
              <div className="input-group">
                <input
                  ref={this.mxTextInputRef}
                  type={"text"}
                  className="form-control"
                  onChange={this.onMXTextFilterChange}
                  onBlur={this.handleMXTextBlur}
                  value={this.state.mxvalue}
                />
                <div className="input-group-prepend c-pointer">
                  <span className="input-group-text">
                    <i className="fa fa-edit" />
                  </span>
                </div>
              </div>
            </DropdownToggle>
          </div>
          <DropdownMenu flip={false} className="dropdownFormHeight">
            <div
              ref={this.dropDownMenuRef}
              className="row"
              style={{ overflow: "visible", width: "100%" }}
            >
              <div className="col-12">
                <MXReacTable2
                  ref={this.mxReactTableRef}
                  columns={this.props.columns}
                  onClickRow={this.onClickRow}
                  filterUrl={this.props.filterUrl}
                />
              </div>
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

MXDropDownFormikInput.propTypes = {
  fieldClassName: PropTypes.string, //  css class of disabled input element
  labelClassName: PropTypes.string, // css class of label
  divClassName: PropTypes.string, // css class of div that contain label and disabled input
  intlMessageId: PropTypes.string, // internalizaion label id
  intlDefaultMessage: PropTypes.string, //internalization default message
  showInput: PropTypes.bool, //boolean value if true this input will be visible in form else invisible
  filterUrl: PropTypes.string, // filterUrl of service that all content will come from for filling react table inside drop down
  columns: PropTypes.array, // COlumns of react table that will be shown in drop down element
  additionalFilters: PropTypes.array //additional filters for service filterUrl,
  //formik:PropTypes.  which formik this input elemnet belogs to
};

export default injectIntl(MXDropDownFormikInput);
