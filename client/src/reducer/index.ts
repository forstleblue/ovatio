import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';

//main rootReducer master bramch
// master comment
const rootReducer: Reducer<any> = combineReducers({
    routing: routerReducer
});
// export root reducer
export default rootReducer;