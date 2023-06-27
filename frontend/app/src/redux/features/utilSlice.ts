import { createSlice } from "@reduxjs/toolkit";

export type Message = {
  message: string
  type: "success"|"warning"|"error"
  display: boolean
};

type utilState = {
  loading : boolean
  message: Message
}

const initialState:utilState = {
  loading: false,
  message:{
    type: "success",
    message: "" ,
    display: false
  }
};

export const util = createSlice({
  name: "request",
  initialState,
  reducers: {
    reset: () => initialState,
    loading: (state: utilState, action)=>{
      const payload = action.payload
      state.loading = payload
    },
    message: (state: utilState, action)=>{
      const payload = action.payload as Message
      state.message = payload
    }
  },
});

export const {loading, message} = util.actions

export default util.reducer;
