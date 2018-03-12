import * as React from 'react';
import "../styles/components/c-root.scss";

interface RootProps {}

export default class Root extends React.Component<RootProps> {
    constructor(props: RootProps) {
        super(props);
    }

    render() {
        return <h1 className="c-root">First time in the typescript</h1>;
    }
}
