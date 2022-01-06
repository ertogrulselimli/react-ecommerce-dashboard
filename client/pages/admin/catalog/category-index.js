import React from "react";
import api from "../../../api";
import {Card, CardBody, CardTitle} from "reactstrap";
import {injectIntl, defineMessages, FormattedMessage} from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from "../common/mx-react-table";
import CategoryTreeTable from "./components/category-tree-table";
import MXForm from "./components/category-form";
import categoryColumns from "./components/category-table-columns";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import MXAlerts from "../common/mx-alerts";
import {displayName} from "../../../helpers";
import {filterTree} from "./utils";
import CategoryPositionChange from "./components/category-position-change";
import {categoryFilterUrl} from '../common/constants';
import {refresh} from '../common/mx-common-index-exports';


const messages = defineMessages({
    updateSuccessMsg: {
        id: "categories.update_success_msg",
        defaultMessage: "Category updated successfully"
    },
    createdSuccessMsg: {
        id: "categories.create_success_msg",
        defaultMessage: "Category created successfully"
    },
    exportExcelButtonTitle: {
        id: "categories.export_excel_button_title",
        defaultMessage: "Export to excel"
    },
    deleteSuccessMessage: {
        id: "categories.delete_success_msg",
        defaultMessage: "Category deleted successfully"
    },
    positionButtonTitle: {
        id: "categories.change_position_title",
        defaultMessage: "Change position"
    },
    treeButtonTitle: {
        id: "categories.tree_button_title",
        defaultMessage: "Show Category Tree"
    }
});

class CategoryIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEntity: null,
            selectedIndex: null,
            showForm: false,
            saving: false,
            form: {},
            parentId: 0,
            parentDesc: [],
            treeFilter: {
                displayName: "",
                description: "",
                code: "",
                parentCode: "",
                categoryLevel: "",
                active: "",
                root: "",
                concrete: ""
            },
            tree: []

        };

        this.defaultFilters = [
            {
                id: "active",
                value: {value: "YES", label: "Yes"}
            },
            {
                id: "root",
                value: {value: "ALL", label: "All"}
            },
            {
                id: "concrete",
                value: {value: "ALL", label: "All"}
            }
        ]
        this.dissmissAlert = this.dissmissAlert.bind(this);
        this.mxReactTableRef = React.createRef();
        //this.onClickRow=onClickRow.bind(this);
        this.refresh = refresh.bind(this);
        //this.add = addNewItem.bind(this);

        // this.state = {
        //   parentId: 0,
        //   parentDesc: [],
        //   loading: false,
        //   list: [],
        //   selected: null,
        //   showForm: false,
        //   showTree: false,
        //   treeFilter: {
        //     displayName: "",
        //     description: "",
        //     code: "",
        //     parentCode: "",
        //     categoryLevel: "",
        //     active: "",
        //     root: "",
        //     concrete: ""
        //   },
        //   filtered: props.filtered || [
        //     {
        //       id: "active",
        //       value: { value: "YES", label: "Yes" }
        //     },
        //     {
        //       id: "root",
        //       value: { value: "ALL", label: "All" }
        //     },
        //     {
        //       id: "concrete",
        //       value: { value: "ALL", label: "All" }
        //     }
        //   ],
        //   columns: categoryColumns,
        //   page: 0,
        //   tree: []
        // };

        // this.fetchTimeout = false;
        // this.filterUrl = `catalog/categories/filtered/`;
        // this.onFetchData = onFetchData.bind(this);
    }

    componentDidMount() {
        this.getTree();
    }

    //..........................Tree table functions..................\\\\\\\\\\\

    onChangeTreeFilter(field, value) {
        this.setState({
            treeFilter: {...this.state.treeFilter, [field]: value}
        });
    }

    getTreeFiltered() {
        const {treeFilter, tree} = this.state;
        return filterTree(tree, treeFilter);
    }

    getTree() {
        api
            .get("catalog/category/tree")
            .then(response => this.setState({tree: response.data}));
    }

    showTree() {
        if (this.state.showTree) {
            this.setState({
                showTree: false,
                selectedEntity: null,
                rowIndex: null
            });
        } else {
            this.setState({
                showTree: true,
                selectedEntity: null,
                rowIndex: null
            });
        }
    }

    //////-----------------------------------React Table functions...............\\\\\\\\\\\\\\\\\\\\\\\

    /*    onFilterColumn(index,checked){
          this.setState(state => {
              const list = state.columns.map((item, j) => {
                  if (j === index) {
                      item['show']=checked?true:false;
                      return item;
                  } else {
                      return item;
                  }
              });
              return {
                  list,
              };
          });
      }*/

    onClickRow(row) {
        if (!this.state.showTree) {
            this.setState({
                selectedEntity:
                    this.state.selectedEntity && row.original.id === this.state.selectedEntity.id
                        ? null
                        : row.original,
                rowIndex:
                    this.state.selectedEntity && row.original.id === this.state.selectedEntity.id
                        ? null
                        : row.index
            });
        } else {
            this.setState({
                selectedEntity:
                    this.state.selectedEntity && row.category.id === this.state.selectedEntity.id
                        ? null
                        : row.category
            });
        }
    }

    edit() {
        api.get(`catalog/category/${this.state.selectedEntity.id}`).then(response => {
            this.setState({
                showForm: true,
                form: response.data
            });
        });
    }

    add() {
        let form =
            this.state.selectedEntity !== null
                ? {
                    parentId: this.state.selectedEntity.id,
                    parentName: this.state.selectedEntity.displayName
                }
                : {};

        this.setState({selectedEntity: null, showForm: true, form: form});
    }

    back() {
        this.setState({showForm: false, parentId: null, parentDesc: []});
    }

    save(e) {
        this.formSubmit();
    }

    dissmissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null});
    }

    attributesChange(attributes) {
        this.setState({
            attributes: attributes,
            attributesChanged: true
        });
    }

    export() {
        api.download("catalog/excel/tree/download");
    }

    delete() {
        api
            .post(`catalog/category/delete/${this.state.selectedEntity.id}`)
            .then(response => {
                if (response.data.response === "ERROR") {
                    this.setState({
                        saving: false,
                        sweetAlertMsg: this.renderDeleteErrorMessage(
                            response.data.errorText,
                            this.state.selectedEntity
                        )
                    });
                } else {
                    this.setState({
                        alertMsg: this.props.intl.formatMessage(
                            messages.deleteSuccessMessage
                        )
                    });
                    setTimeout(() => this.dissmissAlert(), 2000);
                }
            });
    }

    submit(data) {
        this.setState({saving: true});

        data = {...data};
        delete data.parentName;

        let result = data.id
            ? api.put("catalog/category", data)
            : api.post("catalog/category", data);

        result
            .then(response => {
                this.setState({
                    saving: false,
                    showForm: false,
                    alertMsg: this.props.intl.formatMessage(
                        data.id ? messages.updateSuccessMsg : messages.createdSuccessMsg
                    )
                });
                this.refresh()
                this.getTree();

                setTimeout(() => this.dissmissAlert(), 2000);
            })
            .catch(error => {
                //TODO Check data message exists
                this.setState({
                    saving: false,
                    sweetAlertMsg: error.response.data.message
                });
            });
    }

    changePosition() {
        this.setState({
            changePositionCategoryId: this.state.selectedEntity.id
        });
    }

    renderDeleteErrorMessage(errorText, category) {
        return (
            <div>
                {errorText}
                <p
                    className="text-primary c-pointer"
                    onClick={e => {
                        this.props.tabActions.openTab("product", {
                            filtered: [
                                {
                                    id: "categoryId",
                                    value: {
                                        value: category,
                                        label: displayName(category.displayName)
                                    }
                                }
                            ]
                        });
                    }}
                >
                    Show products
                </p>
            </div>
        );
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <CenterCircularProgress
                        portal
                        show={this.state.saving}
                        size={60}
                        delay={800}
                    />
                    <div className="row">
                        <div className="col-3">
                            <CardTitle>
                                <FormattedMessage
                                    id="categories.title"
                                    defaultMessage="Categories"
                                />
                            </CardTitle>
                        </div>
                        <div className="col-9">
                            <ActionButtons
                                hideAdd={this.props.auth.isShopManager()}
                                hideSave={this.props.auth.isShopManager()}
                                hideDelete={this.props.auth.isShopManager()}
                                hideBack={!this.state.showForm}
                                disableSave={!this.state.showForm || this.state.saving}
                                disableEdit={this.state.selectedEntity === null}
                                disableDelete={this.state.selectedEntity === null}
                                disableRefresh={this.state.showForm}
                                disablePosition={this.state.selectedEntity === null}
                                onClickAdd={this.add.bind(this)}
                                onClickBack={this.back.bind(this)}
                                onClickDelete={this.delete.bind(this)}
                                confirmDelete={this.delete.bind(this)}
                                onClickRefresh={this.getTree.bind(this)}
                                onClickEdit={this.edit.bind(this)}
                                onClickSave={this.save.bind(this)}
                                onClickExport={this.export.bind(this)}
                                onClickTree={this.showTree.bind(this)}
                                onClickPosition={this.changePosition.bind(this)}
                                addButtons={[
                                    {
                                        name: "Export",
                                        type: "default",
                                        title: this.props.intl.formatMessage(
                                            messages.exportExcelButtonTitle
                                        ),
                                        icon: "fa fa-file-excel-o"
                                    },
                                    {
                                        name: "Position",
                                        type: "default",
                                        title: this.props.intl.formatMessage(
                                            messages.positionButtonTitle
                                        ),
                                        icon: "fa fa-list"
                                    },
                                    {
                                        name: "Tree",
                                        type: "default",
                                        title: this.props.intl.formatMessage(
                                            messages.treeButtonTitle
                                        ),
                                        icon: "fa fa-tree"
                                    }
                                ]}
                            />
                        </div>
                    </div>

                    <MXAlerts
                        alertMessage={this.state.alertMsg}
                        sweetAlertMessage={this.state.sweetAlertMsg}
                        toggleAlert={this.dissmissAlert}
                        toggleSweetAlert={this.dissmissAlert}
                    />

                    {this.state.showTree ? (
                        <CategoryTreeTable
                            show={!this.state.showForm}
                            loading={this.state.loading}
                            list={this.getTreeFiltered()}
                            selected={this.state.selectedEntity ? this.state.selectedEntity.id : null}
                            onClick={this.onClickRow.bind(this)}
                            filter={this.state.treeFilter}
                            onFilterChange={this.onChangeTreeFilter.bind(this)}
                        />
                    ) : (
                        <div style={ this.state.showForm === true ? {
                            visibility: "hidden",
                            maxHeight: "0",
                            overflow: 'hidden'
                        } : {}}>
                            <MXReactTable
                                ref={this.mxReactTableRef}
                                columns={categoryColumns}
                                onClickRow={this.onClickRow.bind(this)}
                                selectedIndex={this.state.rowIndex}
                                filterUrl={categoryFilterUrl}
                                showTextFilterInput={true}
                                defaultFilters={this.defaultFilters}
                            />
                        </div>
                    )}

                    <div style={this.state.showForm === false ? {
                        visibility: "hidden",
                        maxHeight: "0",
                        overflow: 'hidden'
                    } : {}}>
                        {this.state.showForm?
                            <MXForm
                                formData={this.state.form}
                                submit={this.submit.bind(this)}
                                bindSubmit={e => (this.formSubmit = e)}
                                onAttributesChange={this.attributesChange.bind(this)}
                                tree={this.state.tree}
                            />:null}
                    </div>

                    {this.state.changePositionCategoryId ? (
                        <CategoryPositionChange
                            categoryId={this.state.changePositionCategoryId}
                            close={e => {
                                this.setState({changePositionCategoryId: null});
                                this.getTree();
                            }}
                        />
                    ) : null}
                </CardBody>
            </Card>
        );
    }
}

export default injectIntl(CategoryIndex);
