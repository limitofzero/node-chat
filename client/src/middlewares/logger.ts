const logMiddleware = store => next => action => {
    console.log(`action: ${action.type}, additional dates: ${action.payload}`);
    return next(action);
}

export default logMiddleware;