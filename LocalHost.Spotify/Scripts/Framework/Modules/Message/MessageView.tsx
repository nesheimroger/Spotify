import * as React from "react";
import Module from "../../Containers/Module";

export interface IMessageProps {
    text: string;
}

export class MessageView extends React.Component<IMessageProps>{
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <Module className="dashboard">
                {this.props.text}
            </Module>
        );
    }
}

export default MessageView;