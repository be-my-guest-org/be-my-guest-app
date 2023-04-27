import { createSlice, createAsyncThunk,} from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    // add your non-async reducers here
    login: (state: any, action: any) => {
      const loginData = action.payload;
      //console.log("🚀 ~ store slice loginData", loginData);
      state.value = loginData;
    }, 
    logout: (state: any, action: any) => {
      const logoutData = action.payload;
      //console.log("🚀 ~ logoutData:", logoutData);
      state.value = {};
    },
  },
})

// Action creators
const { reducer } = authSlice;
export default reducer;