import { Store } from 'react-redux';
import { AnyAction } from 'redux';

const logMiddleware = (store: Store<any>) => (next: any) => (action: AnyAction) => {
    console.log('action.type: ', action.type);
    console.log('payload: ', action.payload);
    return next(action);
}

export default logMiddleware;