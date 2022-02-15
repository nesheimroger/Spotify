import * as React from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, matchPath, Outlet } from "react-router-dom";

import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Content } from 'antd/lib/layout/layout';

import { IAppConfig, IAppState, IAppRoute, IAppMenu, IAppMenuItem, IAppMenuGroup } from '../Models';
import AppContext from '../Framework/AppContext';
import client from '../Client';
import _ from 'lodash';

import Sider from 'antd/lib/layout/Sider';
import UserProfileView from './Components/UserProfile/UserProfileView';

function AppMenu(props: Partial<IAppConfig>) {
    var location = useLocation();

    function mapItem(y: IAppMenuItem) {
        return (<Menu.Item key={y.id}><Link to={y.route}>{y.title}</Link></Menu.Item>);
    }
    function isMenuGroup(toBeDetermined: IAppMenu): toBeDetermined is IAppMenuGroup {
        if ((toBeDetermined as IAppMenuGroup).items) {
            return true
        }
        return false
    }
    function isMenuItem(toBeDetermined: IAppMenu): toBeDetermined is IAppMenuItem {
        if ((toBeDetermined as IAppMenuItem).route) {
            return true
        }
        return false
    }

    var menus = _.map(props.menus, (x: (IAppMenu)) => {
       
        if (isMenuGroup(x)) {
            var items = _.map(x.items, mapItem);
            return (
                <SubMenu key={x.id} title={x.title}>
                    {items}
                </SubMenu>
            );
        }
        else if (isMenuItem(x)) {
            return mapItem(x);
        }
    });

    var matchedRoute: IAppRoute = _.find(props.routes, (x: IAppRoute) => {
        var match = matchPath(x.path, location.pathname);
        return match != null;
    });

    var matchedGroup: IAppMenuGroup = matchedRoute != null ? _.find(props.menus, (x: IAppMenuGroup | IAppMenuItem) => {
        if (isMenuGroup(x)) {
            return _.find(x.items, (y: IAppMenuItem) => y.id == matchedRoute.id);
        }
    }) : null;

    var selectedKeys = matchedRoute ? [matchedRoute.id] : [];

    var openKeys = matchedGroup != null ? [matchedGroup.id] : [];

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
        >
            {menus}
        </Menu>
    );
}

function AppLayout(props: IAppState | any) {
    return (
        <Layout style={{ minHeight: '100vh' }} hasSider>
            <Sider>
                <UserProfileView {...(props.currentUser)} />
                {props.children}
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
    
}

export default class App extends React.Component<IAppConfig, IAppState> {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            modules: this.props.modules
        }
    }

    componentDidMount = async () => {
        var currentUser = await client.currentUser();
        this.setState({ currentUser });
    }

    render() {
        if (!this.state.currentUser) return (<div>Loading...</div>);

        var routes = _.map(this.props.routes, (x: IAppRoute) => <Route key={x.id} path={x.path} element={x.element}>{x.children}</Route>);

        return (
            <BrowserRouter>
                <AppContext.Provider value={this.state}>
                    <Routes>
                        <Route path="/" element={
                            <AppLayout {...(this.state)}>
                                <AppMenu
                                    menus={this.props.menus}
                                    routes={this.props.routes}
                                />
                            </AppLayout>
                        }>
                            {routes}
                        </Route>
                    </Routes>
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}