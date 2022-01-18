import { Card } from "antd";
import * as React from "react";


export interface ModuleProps {
    className: string;
}

export class Module extends React.Component<ModuleProps>{
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <Card className={`module ${this.props.className}`}>
                {this.props.children}
            </Card>
        );
    }
}

export default Module;