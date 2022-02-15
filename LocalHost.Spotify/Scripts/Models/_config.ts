export interface IAppRoute {
    id: string,
    path: string;
    element: React.ReactNode,
    children?: React.ReactNode 
}

export interface IAppMenuGroup {
    id: string;
    title: string;
    items: IAppMenuItem[];
}

export interface IAppMenuItem {
    id: string;
    title: string;
    route: string;
}

export interface IAppModule {
    id: string;
    name: string;
    configurator?: (config: any, save: (config: any) => Promise<void>) => React.ReactNode;
    renderer: (key: string, config: any, attributes: Record<string,string>) => React.ReactNode;
}

export type IAppMenu = IAppMenuGroup | IAppMenuItem

export interface IAppConfig {
    routes: IAppRoute[];
    menus: IAppMenu[];
    modules: IAppModule[];
}
