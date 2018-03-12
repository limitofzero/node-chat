import * as React from 'react';

interface RootProps {}

export default class Root extends React.Component<RootProps> {
    constructor(props: RootProps) {
        super(props);
    }

    render() {
        return (<h1>First time in the typescript</h1>);
    }
}
