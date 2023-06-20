import { createSlice } from "@reduxjs/toolkit";

export type RequestState = {
  action: string|null
  pending: "COMPLETED" | "PENDING" | "NONE"
};

export type Message = {
  message: string
  type: "success"|"warning"|"error"
  display: boolean
};

type utilState = {
  requestState : RequestState
  message: Message
}

const initialState:utilState = {
  requestState:{
    action: null,
    pending: "NONE"
  },
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
    requestStatus: (state: utilState, action)=>{
      const payload = action.payload as RequestState
      state.requestState = payload
    },
    message: (state: utilState, action)=>{
      const payload = action.payload as Message
      state.message = payload
    }
  },
});

export const {requestStatus, message} = util.actions

export default util.reducer;
