import * as React from "react";

export class App extends React.Component<Iprops, {}> {
    render() {
        return <h1>Hello {this.props.name}</h1>;
    }
}

interface Iprops {
    name: string;
}