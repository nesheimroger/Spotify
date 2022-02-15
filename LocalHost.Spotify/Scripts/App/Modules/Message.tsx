import * as React from 'react';
import Module from '../../Framework/Containers/Module';
import { IAppModule } from '../../Models';


interface IMessageProps {
    text: string;
}

class MessageModule implements IAppModule {
    id = "message";
    name = "Message";

    //configurator = (currentProps: IMessageProps, saveProps: (newProps: IMessageProps) => void) => {
    //    return (
    //        <div>Configurator</div>
    //    );
    //}

    configurator = null;

    renderer = (key: string, props: IMessageProps, attributes: Record<string,string>) => {
        return (
            <Module key={key} id={this.id} attributes={attributes}>
                <h1>{this.name}:</h1>
                <p>{props.text}</p>
            </Module>    
        );
    };
}

export default new MessageModule();