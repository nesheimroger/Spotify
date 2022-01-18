export interface IAppRoute {
    key: string,
    path: string;
    element: React.ReactNode,
    children?: React.ReactNode 
}

export interface IAppMenuGroup {
    key: string;
    title: string;
    items: IAppMenuItem[];
}

export interface IAppMenuItem {
    key: string;
    title: string;
    route: string;
}

export interface IAppModule {
    key: string;
    title: string;
    configurator?: (config: any, save: (config: any) => Promise<any>) => React.ReactNode;
    renderer: (config: any) => React.ReactNode;
}

export type IAppMenu = IAppMenuGroup | IAppMenuItem

export interface IAppConfig {
    routes: IAppRoute[];
    menus: IAppMenu[];
    modules: IAppModule[];
}
