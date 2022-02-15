import * as React from 'react';
import { IAppModule } from '../../Models';
import ModuleWrapper from '../../Framework/Containers/Module';

interface IInfoProps {
    text: string;
}

class InfoModule implements IAppModule {
    id = "info";
    name = "Info";

    //configurator = (currentProps: IInfoProps, saveProps: (newProps: IInfoProps) => void) => {
    //    return (
    //        <div>Configurator</div>
    //    );
    //}

    configurator = null;

    renderer = (key: string, props: IInfoProps, attributes: Record<string,string>) => {
        return (
            <ModuleWrapper key={key} id={this.id} attributes={attributes}>
                <h1>{this.name}:</h1>
                <p>{props.text}</p>
            </ModuleWrapper>    
        );
    };
}

export default new InfoModule();
