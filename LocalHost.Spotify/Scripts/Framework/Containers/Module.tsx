import { Card } from "antd";
import * as React from "react";
import * as _ from 'lodash';

export interface IModuleProps {
    id: string;
    attributes?: Record<string, string>;
}

class Module extends React.Component<IModuleProps>{
    constructor(props) {
        super(props)
    }

    render = () => {

        var attr = {};

        _.map(this.props.attributes, (value, key) => {
            attr[`data-${key}`] = `${value}`;
        })

        return (
            <Card className={`module module-${this.props.id}`} {...attr}>
                {this.props.children}
            </Card>
        );
    }
}


export default Module;


