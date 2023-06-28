import axios, { AxiosResponse } from 'axios'
import { getCookie, hasCookie, deleteCookie } from 'cookies-next';

import {IResponse} from '@/interfaces/index'
const COOKIE_NAME = process.env.COOKIE_NAME || ""

  
export const baseURL = "http://localhost:4001/api"
export const baseOwnerURL = `${baseURL}/owner`
export const baseAdminURL = `${baseURL}/company`
export const baseSchoolURL = `${baseURL}/school`

export const apiInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL,
  withCredentials: true,
  validateStatus: (status:number) => status < 500,
})

const token_refresh = async () => {
  const token = JSON.parse(getCookie(COOKIE_NAME) as string)

  const response  = await apiInstance.post<AxiosResponse, IResponse>('/auth/refresh', {refresh: token.refresh})
  if(response.status === 401){
    deleteCookie(COOKIE_NAME)
    delete apiInstance.defaults.headers["Authorization"]
  }

  if(response.status === 200){    
    apiInstance.defaults.headers["Authorization"] = `Bearer ${response.data.access}`
  }

  return response
}

export const getRequest = async (path: string): Promise<IResponse> => {
  let response = await apiInstance.get<AxiosResponse, IResponse>(path)
  if (response.status === 401 && hasCookie(COOKIE_NAME)) {
    let response = await token_refresh()
    if(response.status !== 200)
      return response
      
    response =  await apiInstance.get<AxiosResponse, IResponse>(path)
    return response
  }
  return response
}

export const postRequest = async (path: string, payload: any): Promise<IResponse> => {
  const response = await apiInstance.post<AxiosResponse, IResponse>(path, payload)
  if (response.status === 401 && hasCookie(COOKIE_NAME)) {
    let response = await token_refresh()
    if(response.status !== 200)
      return response
      
    response = await apiInstance.post<AxiosResponse, IResponse>(path, payload)
    return response
  }
  return response
}

export const postFormdata = async (path: string, formData: FormData): Promise<IResponse> => {
  const response = await apiInstance.post<AxiosResponse, IResponse>(path, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
  if (response.status === 401 && hasCookie(COOKIE_NAME)) {
    let response = await token_refresh()
    if(response.status !== 200)
      return response
      
    response = await apiInstance.post<AxiosResponse, IResponse>(path, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }) 
    return response
  }
  return response
}

export const patchRequest = async (path: string, payload: any): Promise<IResponse> => {
  const response = await apiInstance.patch<AxiosResponse, IResponse>(path, payload)
  if (response.status === 401 && hasCookie(COOKIE_NAME)) {
    let response = await token_refresh()
    if(response.status !== 200)
      return response
      
    response = await apiInstance.patch<AxiosResponse, IResponse>(path, payload)
    return response
  }
  return response
}

export const deleteRequest = async (path: string): Promise<IResponse> => {
  const response = await apiInstance.delete<AxiosResponse, IResponse>(path)
  if (response.status === 401 && hasCookie(COOKIE_NAME)) {
    let response = await token_refresh()
    if(response.status !== 200)
      return response
      
    response = await apiInstance.delete<AxiosResponse, IResponse>(path)
    return response
  }
  return response
}
