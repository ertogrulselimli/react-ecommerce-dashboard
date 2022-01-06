import React from "react";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import classnames from "classnames";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import * as authActions from "../../redux/actions/auth-actions";
import * as tabActions from "../../redux/actions/tab-actions";
import * as alertActions from "../../redux/actions/alert-actions";
import * as productApproveAction from "../../redux/actions/product-approve-actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RequestErrorMessage from "../../components/alert/request-error-message";
import connection from "../../components/websocket/connection";

import {
  AppFooter,
  AppHeader,
  AppNavbarBrand,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
  AppSidebarToggler
} from "../../components/coreui/index";

// sidebar nav config
import getNavigation from "./_nav.js";
import { tabs } from "./_nav.js";

import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

//import flag langs
import flagaz from "../../assets/img/brand/az.png";
import flagen from "../../assets/img/brand/en.png";
import flagru from "../../assets/img/brand/ru.png";

class AdminIndex extends React.Component {
  componentDidMount() {
    connection.connect();
    this.props.productApproveAction.getProductUnpprovedCount();
    this.props.productApproveAction.listenProductCountChange();
  }

  changeLanguage(x) {
    //let lang = this.props.auth.language === "az" ? "ru" : "az";
    let lang = x;
    this.props.authActions.changeLanguage(lang);
  }

  activateTab(componentName) {
    this.props.tabActions.openTab(componentName);
  }

  openTab(menuItem) {
    this.props.tabActions.openTab(menuItem.component);
  }

  closeTab(componentName, e) {
    e.stopPropagation();
    this.props.tabActions.closeTab(componentName);
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
            minimized={{
              src: sygnet,
              width: 30,
              height: 30,
              alt: "CoreUI Logo"
            }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />
          <Nav className="ml-auto" navbar>
            <NavItem className="d-md-down-none mr-3">
              <UncontrolledDropdown setActiveFromChild>
                <DropdownToggle tag="a" className="nav-link c-pointer" caret>
                  <i className="fa fa-globe mr-1" aria-hidden="true" />
                  {this.props.auth.language === "az"
                    ? "AZE"
                    : this.props.auth.language === "ru"
                    ? "RUS"
                    : "ENG"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink
                      onClick={this.changeLanguage.bind(this, "az")}
                      className="c-pointer mr-2"
                    >
                      <img src={flagaz} alt="flagaz" className="mr-2" />
                      azerbaijani
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      onClick={this.changeLanguage.bind(this, "en")}
                      className="c-pointer mr-2"
                    >
                      <img src={flagen} alt="flagen" className="mr-2" />
                      english
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      onClick={this.changeLanguage.bind(this, "ru")}
                      className="c-pointer mr-2"
                    >
                      <img src={flagru} alt="flagru" className="mr-2" />
                      russian
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
            {/* <NavItem className="d-md-down-none d-flex">
              <NavLink
                onClick={this.changeLanguage.bind(this)}
                className="c-pointer"
              >
                {this.props.auth.language === "az" ? "RU" : "AZ"}
              </NavLink>
            </NavItem> */}
            <NavItem className="d-md-down-none mr-2">
              <NavLink>{this.props.auth.username}</NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink href="#" className="pr-4">
                <span onClick={this.props.authActions.logout}>
                  <i className="fa fa-sign-out" />
                  &nbsp;
                  <FormattedMessage id="logout" defaultMessage="logout" />
                </span>
              </NavLink>
            </NavItem>
          </Nav>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav
              open={["dashboard"]}
              navConfig={getNavigation(this.props.auth.authority)}
              onClickItem={this.openTab.bind(this)}
              {...this.props}
            />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>

          <main className="main">
            <div className="admin-top-nav">
              {Object.values(this.props.tabs.list).map((tab, key) => (
                <div
                  className={classnames([
                    "admin-top-nav-item",
                    { active: this.props.tabs.active === tab.component }
                  ])}
                  key={key}
                  onClick={this.activateTab.bind(this, tab.component)}
                >
                  <p className="admin-top-nav-item-title">
                    {this.props.intl.formatMessage(tabs[tab.component].title)}
                  </p>
                  <i
                    className="fa fa-times"
                    onClick={this.closeTab.bind(this, tab.component)}
                  />
                </div>
              ))}
            </div>

            <Container fluid style={{ padding: "0 15px", marginTop: "30px" }}>
              <TabContent
                activeTab={this.props.tabs.active}
                className="bg-transparent border-0"
              >
                {Object.values(this.props.tabs.list).map(tab => {
                  const Component = tabs[tab.component].component;
                  return (
                    <TabPane
                      tabId={tab.component}
                      key={tab.component}
                      className="p-0"
                    >
                      <Component {...this.props} {...tab.props} />
                    </TabPane>
                  );
                })}
              </TabContent>
            </Container>
          </main>
        </div>
        <AppFooter>
          <span>&copy; 2018 creativeLabs</span>
          <span className="ml-auto">
            Powered by <a href="https://coreui.io/react">GNI</a>
          </span>
        </AppFooter>

        <RequestErrorMessage />
      </div>
    );
  }
}

function mapStoreToProps(state) {
  return {
    auth: state.auth,
    tabs: state.tabs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    tabActions: bindActionCreators(tabActions, dispatch),
    alertActions: bindActionCreators(alertActions, dispatch),
    productApproveAction: bindActionCreators(productApproveAction, dispatch)
  };
}

AdminIndex = connect(
  mapStoreToProps,
  mapDispatchToProps
)(AdminIndex);

export default injectIntl(AdminIndex);
