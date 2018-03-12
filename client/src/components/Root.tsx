import * as React from 'react';
import Chat from './Chat';
import "../styles/components/c-root.scss";

interface RootProps {}

export default class Root extends React.Component<RootProps> {
    constructor(props: RootProps) {
        super(props);
    }

    render() {
        return <div className="container">
            <div className="row"><Chat/></div>
        </div>;
    }
}
