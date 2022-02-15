import * as React from "react";

import configuration from '../Framework/AppConfig';

import Overview from "./Pages/Overview";

import InfoModule from "./Modules/Info";

//TODO: Simplify route and menu, dont really need all the duplicate info

configuration.addRoute({
    id: "extension/overview",
    path: "/extension",
    element: <Overview />
});

configuration.addMenu({
    id: "extension",
    title: "Extension",
    items: [
        { id: "extension/overview", title: "Overview", route: "/extension" }
    ]
});

configuration.addModule(InfoModule);



