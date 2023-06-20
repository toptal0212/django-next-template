import axios, { AxiosResponse } from 'axios'

export interface IResponse {
    data: any
    status: number
  }
  
export const baseURL = "http://localhost:4001"
export const baseAuthURL = `${baseURL}/auth`
export const baseAdminURL = `${baseURL}/admin`

export const apiInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL,
  withCredentials: true,
  validateStatus: (status:number) => status < 500,
})

const token = () => apiInstance.post<AxiosResponse, IResponse>('/token/refresh')

export const getRequest = async (path: string): Promise<IResponse> => {
  const response = await apiInstance.get<AxiosResponse, IResponse>(path)
  if (response.status === 401) {
    const tokenResponse = await token()
    if (tokenResponse.status !== 200) {
      return tokenResponse
    }
    apiInstance.defaults.headers["Authorization"] = `Bearer ${tokenResponse.data.access}`
    return apiInstance.get<AxiosResponse, IResponse>(path)
  }
  return response
}

export const postRequest = async (path: string, payload: any): Promise<IResponse> => {
  const response = await apiInstance.post<AxiosResponse, IResponse>(path, payload)
  if (response.status === 401) {
    const tokenResponse = await token()
    if (tokenResponse.status !== 200) {
      return tokenResponse
    }
    apiInstance.defaults.headers["Authorization"] = `Bearer ${tokenResponse.data.access}`
    return apiInstance.post<AxiosResponse, IResponse>(path, payload)
  }
  return response
}

export const postFormdata = async (path: string, formData: FormData): Promise<IResponse> => {
  const response = await apiInstance.post<AxiosResponse, IResponse>(path, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
  if (response.status === 401) {
    const tokenResponse = await token()
    if (tokenResponse.status !== 200) {
      return tokenResponse
    }
    apiInstance.defaults.headers["Authorization"] = `Bearer ${tokenResponse.data.access}`
    return apiInstance.post<AxiosResponse, IResponse>(path, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  }
  return response
}

export const patchRequest = async (path: string, payload: any): Promise<IResponse> => {
  const response = await apiInstance.patch<AxiosResponse, IResponse>(path, payload)
  if (response.status === 401) {
    const tokenResponse = await token()
    if (tokenResponse.status !== 200) {
      return tokenResponse
    }
    apiInstance.defaults.headers["Authorization"] = `Bearer ${tokenResponse.data.access}`
    return apiInstance.patch<AxiosResponse, IResponse>(path, payload)
  }
  return response
}

export const deleteRequest = async (path: string): Promise<IResponse> => {
  const response = await apiInstance.delete<AxiosResponse, IResponse>(path)
  if (response.status === 401) {
    const tokenResponse = await token()
    if (tokenResponse.status !== 200) {
      return tokenResponse
    }
    apiInstance.defaults.headers["Authorization"] = `Bearer ${tokenResponse.data.access}`
    return apiInstance.delete<AxiosResponse, IResponse>(path)
  }
  return response
}
