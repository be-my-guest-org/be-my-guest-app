import { createSlice, createAsyncThunk,} from "@reduxjs/toolkit";
import { Item } from '../../models/models';
import EventDataService from "../../services/app.services";

export const createEvent : any = createAsyncThunk(
    "events/create",
    async (event: Item) => {
        const sum = await EventDataService.create(event);
        console.log("🚀 ~ sum", sum);
    }
);

export const eventSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    // add your non-async reducers here
    /*addEvent: (state: any, action: any) => {
      state.value = [...state.value, action.payload];
    },*/
  },
  extraReducers: {
    [createEvent.fulfilled]: (state: any, action: any) => {
        state.push(action.payload);
      },
  }
})

// Action creators
const { reducer } = eventSlice;
export default reducer;