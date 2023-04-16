import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './slices/event.slice';
import authReducer from './slices/auth.slice';

const reducer = {
  events: eventReducer,
  auth: authReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;

