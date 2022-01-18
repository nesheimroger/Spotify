import * as React from "react";
import Page from '../../../Framework/Containers/Page';
import * as _ from 'lodash';

import './Dashboard.less';

import AppContext from "../../../Framework/AppContext";
import { IAppModule } from "../../../Models";

export class Dashboard extends React.Component{
    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    constructor(props) {
        super(props)
    }

    render = () => {

        var config = [
            {
                moduleKey: "message",
                moduleConfig: {
                    text: "test"
                },
                display: {
                    size: "big"
                }
            }
        ];

        var modules = _.map(config, (c) => {
            var module: IAppModule = _.find(this.context.modules, (m: IAppModule) => m.key == c.moduleKey);
            if (module != null) return module.renderer(c.moduleConfig);
        });

        return (
            <Page className="dashboard">
                { modules }
            </Page>
        );
    }
}

export default Dashboard;