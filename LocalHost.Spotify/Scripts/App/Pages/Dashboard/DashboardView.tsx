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
                module: "message",
                config: {
                    text: "News",
                },
                attributes: {
                    width: 2,
                    height: 2
                }
            },
            {
                module: "message",
                config: {
                    text: "Hours",
                },
                attributes: {
                    width: 1,
                    height: 1
                }
            },
            {
                module: "info",
                config: {
                    text: "Image of the day",
                },
                attributes: {
                    width: 1,
                    height: 1
                }
            },
            {
                module: "message",
                config: {
                    text: "Projects",
                },
                attributes: {
                    width: 2,
                    height: 1
                }
            },
            {
                module: "message",
                config: {
                    text: "Orders",
                },
                attributes: {
                    width: 2,
                    height: 1
                }
            },
            {
                module: "message",
                config: {
                    text: "Invoices",
                },
                attributes: {
                    width: 2,
                    height: 1
                }
            },
        ];

        var modules = _.map(config, (c, i) => {
            var module: IAppModule = _.find(this.context.modules, (m: IAppModule) => m.id == c.module);
            if (module != null) return module.renderer(`module-${i}`, c.config, c.attributes);
        });

        return (
            <Page className="dashboard">
                { modules }
            </Page>
        );
    }
}

export default Dashboard;