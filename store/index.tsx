import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import kasaSlice from './kasaSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    kasaSlice: kasaSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
