import { IAppConfig, IAppMenu, IAppModule, IAppRoute } from "../Models";

//@ts-ignore
var config: IAppConfig = window.config || {
    routes: [],
    menus: [],
    modules: []
};

var setConfig = (c: IAppConfig) => {
    //@ts-ignore
    window.config = config = c;
}

export default  {
    addRoute: (item: IAppRoute) => {
        var newItems: IAppRoute[] = [...(config.routes), item];
        var newState: IAppConfig = Object.assign({}, config, { routes: newItems });
        setConfig(newState);
    },
    addMenu: (item: IAppMenu) => {
        var newItems: IAppMenu[] = [...(config.menus), item];
        var newState: IAppConfig = Object.assign({}, config, { menus: newItems });
        setConfig(newState);
    },
    addModule: (item: IAppModule) => {
        var newItems: IAppModule[] = [...(config.modules), item];
        var newState: IAppConfig = Object.assign({}, config, { modules: newItems });
        setConfig(newState);
    }
};