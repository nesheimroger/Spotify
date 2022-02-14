import * as React from 'react';
import { IAppState } from '../Models';

var initial: IAppState = {
    currentUser: null,
    modules: []
}

var AppContext: React.Context<IAppState> = null;

//@ts-ignore
if (window.context as React.Context<IAppState>) {
    //@ts-ignore
    AppContext = window.context;
} else {
    //@ts-ignore
    AppContext = window.context = React.createContext(initial)
}

export default AppContext;