import { createSlice, createAsyncThunk,} from "@reduxjs/toolkit";
import { Event } from '../../models/models';
import EventService from "../../services/app.services";
import { axiosClient } from "../../services/axiosClient";

export const createEvent : any = createAsyncThunk(
    "events/create",
    async (event: Event) => {
      const sum = await EventService.create(event);
      console.log("🚀 ~ sum", sum);
    }
);

const getTokenFromStore = (thunkAPI: any) => {
  return thunkAPI.getState().auth.value.token;
}

export const getAllEvents : any = createAsyncThunk(
  "events/getAll",
  async (_, thunkAPI) => {
    try {
      const token = getTokenFromStore(thunkAPI);
      const eventService = new EventService(token);
      const result = await eventService.getAll();
      return result?.data?.events;
    } catch (e) {
      console.error("Error fetching events:", e);
    }
  }
);

export const eventSlice = createSlice({
  name: 'events',
  initialState: {data: []},
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
    [getAllEvents.fulfilled]: (state: any, action: any) => {
      state.data = [...action.payload];
    },
  }
})

// Action creators
const { reducer } = eventSlice;
export default reducer;