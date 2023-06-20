import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {getRequest, postRequest, apiInstance} from '../apiBase'
import type { AppDispatch } from "../store";
import { IUser } from "@/interfaces/user";
import {requestStatus, message, RequestState} from './utilSlice'

type AuthState = {
  is_authenticated: boolean,
  user: IUser|null
};

const initialState = {
  is_authenticated: false,
  user: null
} as AuthState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    login: (state : AuthState, action) => {
      state.is_authenticated = true
    },
    logout: (state : AuthState) => {      
      state.is_authenticated = false
      state.user = null
    },
    me: (state : AuthState, action) => {  
      const user: IUser = action.payload as IUser
      state.user = user
    },
  },
});


export const login =() => async (dispatch:AppDispatch) => {
  dispatch(requestStatus({action: auth.actions.logout.name,  pending: "PENDING" }))
  
  const response = await postRequest("/login", {
    username: "",
    password: ""
  })

  if(response.status == 200){
    apiInstance.defaults.headers["Authorization"] = `Bearer ${response.data.access}`
    dispatch(auth.actions.login(response.data))
  }else{

  }
  dispatch(requestStatus({action: auth.actions.logout.name,  pending: "COMPLETED" }))
}

export const logout = () => async (dispatch:AppDispatch) => {
  dispatch(requestStatus({action: auth.actions.logout.name,  pending: "PENDING" }))

  const response = await postRequest("/logout", {})

  if(response.status == 200){
    apiInstance.defaults.headers["Authorization"] = null
    dispatch(auth.actions.logout())
  }else{

  }
  dispatch(requestStatus({action: auth.actions.logout.name,  pending: "COMPLETED" }))
}

export const me = () => async (dispatch:AppDispatch) => {
  dispatch(requestStatus({action: auth.actions.logout.name,  pending: "PENDING" }))

  const response = await getRequest("/me")

  if(response.status == 200){
    dispatch(auth.actions.me(response.data))
  }else{

  }
  dispatch(requestStatus({action: auth.actions.logout.name,  pending: "COMPLETED" }))
}

export default auth.reducer;
