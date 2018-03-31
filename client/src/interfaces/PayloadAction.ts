import { Action } from 'redux';

interface PayloadAction extends Action {
    type: string,
    payload: any
}

export default PayloadAction;