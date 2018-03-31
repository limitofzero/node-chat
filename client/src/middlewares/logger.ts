import { Store } from 'react-redux';
import { AnyAction } from 'redux';

const logMiddleware = (store: Store<any>) => (next: any) => (action: AnyAction) => {
    console.log(`action: ${action.type}, additional dates: ${action.payload}`);
    return next(action);
}

export default logMiddleware;