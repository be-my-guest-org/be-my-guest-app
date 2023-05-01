import { createSlice, createAsyncThunk,} from "@reduxjs/toolkit";
import { Event, EventRendered } from '../../models/models';
import EventService from "../../services/app.services";
import { formatWithOptions } from "date-fns/fp";
import { it } from 'date-fns/locale';

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
      const events = result?.data?.events;
      //console.log("🚀 ~ events:", events);
      const eventsToRender = events.map(e => mapEventForRender(e));
      //console.log("🚀 ~ eventsToRender:", eventsToRender);
      return eventsToRender;
    } catch (e) {
      console.error("Error fetching events:", e);
    }
  }
);

const mapEventForRender = (eventData: Event) : EventRendered=> {
  //console.log("🚀 ~ mapEventForRender - eventData:", eventData);
  const eventRendered: EventRendered = {
    event: eventData,
    title: eventData.title,
    distance: '5km',
    userAvatarUrl: './../../assets/images/icon.png',
    formattedWhere: "Villorba",
    formattedWhen: formatWithOptions({ locale: it }, "eeee d MMMM '-' H:MM", new Date(eventData.when)) /*formatWithOptions({ locale: it }, "dddd mmmm - hh:MM")*/,
  };
  return eventRendered;
}

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