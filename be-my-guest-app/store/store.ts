import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './../slices/event.slice';

const reducer = {
  events: eventReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;

