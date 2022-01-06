import React, {Component} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import {createPortal} from "react-dom";
import {displayName} from "../../../../helpers";
import api from "../../../../api";
import classnames from "classnames";

let draggableRoot = document.createElement("div");
draggableRoot.id = "draggable";
document.getElementsByTagName("body")[0].appendChild(draggableRoot);

const grid = 8;

const getItemStyle = (option, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 2px 0`,
    background: option.isDragging ? "lightblue" : "white",
    border: "1px dashed rgba(0,0,0,0.4)",
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    padding: grid
});


const ListItem = props => {


};


export default class CategoryPositionChange extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            activeTab: 'siblings',
            categories: []
        };

        this.onDragEnd = this.onDragEnd.bind(this);
    }


    componentDidMount(categoryId) {
        this.getSiblingsPosition()
    }

    getSiblingsPosition() {
        this.setState({loading: true});
        api.get(`catalog/category/positions/${this.props.categoryId}`).then(response => {
            this.setState({categories: response.data, loading: false})
        })
    }

    getTopSalesPosition() {
        this.setState({loading: true});
        api.get(`catalog/category/top-sales/${this.props.categoryId}`).then(response => {
            this.setState({categories: response.data, loading: false})
        })
    }

    tabChange(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({categories: [], activeTab: tab});
            if (tab === 'siblings') {
                this.getSiblingsPosition()
            } else {
                this.getTopSalesPosition()
            }
        }
    }


    optionalPortal(styles, element) {
        if (styles.position === "fixed") {
            return createPortal(element, draggableRoot);
        }
        return element;
    }

    onDragEnd(result) {
        if (!result.destination) return;

        const categories = [...this.state.categories];
        const requestData = {
            categoryId: categories[result.source.index].id,
        };

        let updateEnpoint = "";
        if(this.state.activeTab === "siblings"){
            requestData.rank = categories[result.destination.index].rank;
            updateEnpoint = "catalog/category/positions/update";

        }else{
            requestData.topSalesRank = categories[result.destination.index].topSalesRank;
            updateEnpoint = "catalog/category/top-sales/update";
        }

        const [removed] = categories.splice(result.source.index, 1);
        categories.splice(result.destination.index, 0, removed);

        this.setState({categories, loading: true});
        api.post(updateEnpoint, requestData).then(response => {
            this.setState({categories: response.data.body, loading: false})
        })

    }

    getCategories() {
        return this.state.categories
    }

    render() {

        const {activeTab} = this.state;

        return (

            <Modal
                isOpen={true}
                toggle={this.props.close}
            >
                <ModalBody>

                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === 'siblings'})}
                                onClick={e => {
                                    this.tabChange('siblings')
                                }}
                            >
                                Position
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === 'topsales'})}
                                onClick={e => {
                                    this.tabChange('topsales')
                                }}
                            >
                                TopSales
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={1}>
                        <TabPane tabId={1}>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {this.getCategories().map((category, index) => (
                                                <Draggable
                                                    isDragDisabled={this.state.loading}
                                                    key={category.id}
                                                    draggableId={category.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => {
                                                        return this.optionalPortal(
                                                            provided.draggableProps.style,
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    {
                                                                        isDragging: snapshot.isDragging
                                                                    },
                                                                    provided.draggableProps.style
                                                                )}
                                                            >
                                                                <div>
                                                                    {displayName(category.displayName)}
                                                                </div>
                                                            </div>
                                                        );
                                                    }}
                                                </Draggable>
                                            ))}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </TabPane>
                    </TabContent>


                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="default"
                        onClick={this.props.close}
                    >
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
