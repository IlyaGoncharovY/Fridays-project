import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {authReducer, setAuthACType} from "./reducers/authReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {ErrorReducer} from "./reducers/ErrorReducer";
import {ProfileActionType, profileReducer} from "./reducers/profileReducer";
import {RegistrationActionType, registrationReducer} from "./reducers/registration-Reducer";
import {ActionLoginType, loginReducer} from "./reducers/loginReducer";

export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppActionType = setAuthACType | ProfileActionType | RegistrationActionType | ActionLoginType
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>

const rootReducer = combineReducers({
    registration: registrationReducer,
    profile: profileReducer,
    auth : authReducer,
    login : loginReducer,
    error : ErrorReducer

})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

