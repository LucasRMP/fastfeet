import {
  createStore as reduxCreateStore,
  compose,
  applyMiddleware,
} from 'redux';

function createStore(reducers, middlewares) {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return reduxCreateStore(reducers, enhancer);
}

export default createStore;
