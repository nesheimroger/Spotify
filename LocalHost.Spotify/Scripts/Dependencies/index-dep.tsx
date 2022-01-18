import * as React from "react";

import configuration from '../Framework/AppConfig';
import DependencyOverview from "./Pages/DependencyOverview";

configuration.addRoute({
    key: "dependency/overview",
    path: "/dependencies",
    element: <DependencyOverview />
});

configuration.addMenu({
    key: "dependency",
    title: "Dependencies",
    items: [
        { key: "dependency/overview", title: "Overview", route: "/dependencies" }
    ]
});



