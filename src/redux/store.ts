import { configureStore, combineReducers} from '@reduxjs/toolkit';
import languageReducer from './language/languageReducer';
import { userSlice } from './user/slice';
import { profileSlice } from './profile/slice';
import { actionLog} from './middlewares/actionLog';

const rootReducer = combineReducers({
    language: languageReducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export default store;