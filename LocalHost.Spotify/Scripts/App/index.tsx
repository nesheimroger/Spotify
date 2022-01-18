﻿import * as React from "react";
import { render } from 'react-dom';

import App from './App';
import Dashboard from './Pages/Dashboard/DashboardView';

import { IAppConfig, IAppMenuItem } from "../Models";

import '../../Styles/index.less';
import MessageView, { IMessageProps } from "../Framework/Modules/Message/MessageView";

//@ts-ignore
var externalConfig = window.config as IAppConfig;

var config: IAppConfig = {
    routes: [
        { key: "dashboard", path: "/", element: <Dashboard /> },
        ...(externalConfig.routes)
    ],
    menus: [
        { key: "dashboard", title: "Dashboard", route: "/" } as IAppMenuItem,
        ...(externalConfig.menus)
    ],
    modules: [
        {
            key: "message",
            title: "Message",
            configurator: null,
            renderer: (props: IMessageProps) => <MessageView {...props} />
        },
        ...(externalConfig.modules)
    ]
}

render(<App {...(config)} />, document.getElementById("app"));

