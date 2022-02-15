import * as React from "react";
import AppContext from "../../Framework/AppContext";
import Page from "../../Framework/Containers/Page";

export default class Overview extends React.Component {
    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page className="extension-overview">Overview for {this.context.currentUser.name}</Page>
        );
    }
}
