import * as React from "react";
import Page from '../../../Framework/Containers/Page';
import * as _ from 'lodash';

import './Artists.less';

import AppContext from "../../../Framework/AppContext";

export class Artists extends React.Component{
    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    constructor(props) {
        super(props)
    }

    render = () => {

       
        return (
            <Page className="artists">
                Artists
            </Page>
        );
    }
}

export default Artists;