import * as React from "react";

export interface PageProps {
    className: string;
}

export class Page extends React.Component<PageProps>{
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <section className={`page ${this.props.className}`}>
                {this.props.children}
            </section>
        );
    }
}

export default Page;