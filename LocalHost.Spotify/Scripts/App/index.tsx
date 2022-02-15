import * as React from "react";
import { render } from 'react-dom';

import App from './App';
import Dashboard from './Pages/Dashboard/DashboardView';
import Artists from "./Pages/Artists/ArtistsView";


import { IAppConfig, IAppMenuItem } from "../Models";

import '../../Styles/index.less';
import Message from "./Modules/Message";

//@ts-ignore
var externalConfig = window.config as IAppConfig;

var config: IAppConfig = {
    routes: [
        { id: "dashboard", path: "/", element: <Dashboard /> },
        { id: "artists", path: "/artists", element: <Artists /> },
        ...(externalConfig.routes)
    ],
    menus: [
        { id: "dashboard", title: "Dashboard", route: "/" } as IAppMenuItem,
        { id: "artists", title: "Artists", route: "/artists" } as IAppMenuItem,
        ...(externalConfig.menus)
    ],
    modules: [
        Message,
        ...(externalConfig.modules)
    ]
}

render(<App {...(config)} />, document.getElementById("app"));


