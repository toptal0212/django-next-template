"use client"

import React, { useState, useContext, useEffect } from 'react'
import {getCookie, setCookie, hasCookie , deleteCookie, getCookies} from "cookies-next"
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode'
//api here is an axios instance which has the baseURL set according to the env.
import {apiInstance, getRequest} from '@/redux/apiBase';
import { IUser, LoginPayload } from '@/interfaces';
import { useAppDispatch } from '@/redux/hooks';
import {loading} from '@/redux/features/utilSlice'


type AuthContextProps = {
    isAuthenticated: boolean;
    loading: boolean;
    user: IUser | null;
    login: (crediential: LoginPayload, callback: (perm: string) => void) => void;
    logout: () => void;
  }
  
const AuthContext = React.createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps{
    children: React.ReactNode
}

export const AuthProvider = ({ children } : AuthProviderProps) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [user, setUser] = useState<IUser|null>(null)

    useEffect(() => {
        async function loadUserFromCookies() {
            if(hasCookie("complereailegal")){           
                const token = JSON.parse(getCookie("complereailegal") as string)
                if (token) {
                    apiInstance.defaults.headers.Authorization = `Bearer ${token.access}`
                    const token_decoded:any = jwt_decode(token)
                    const res = await getRequest(`/${token_decoded.permission}/me`)
                    if(res.status === 200){
                        setUser(res.data)
                    }
                }else{
                    router.replace("/login")
                }
            }else{
                router.replace("/login")
            }
        }
        dispatch(loading(true))
        loadUserFromCookies()
        dispatch(loading(false))
    }, [])

    const login = async (credientail: LoginPayload, callback: (perm: string) => void) => {
        dispatch(loading(true))

        const response = await apiInstance.post('/auth/login', credientail)
        if(response.status === 200){        
            deleteCookie("complereailegal")    
            setCookie("complereailegal", JSON.stringify(response.data))
            const token_decoded:any = jwt_decode(response.data)
            apiInstance.defaults.headers.Authorization = `Bearer ${response.data.access}`
            const res = await apiInstance.get(`/${token_decoded.permission}/me`)
            if(res.status === 200){
                setUser(res.data)
                callback(res.data.permission)
            }else{
                callback("")
            }
        }else{
            callback("")
        }
        
        dispatch(loading(false))
    }

    const logout = () => {
        dispatch(loading(true))

        deleteCookie("complereailegal")
        setUser(null)
        delete apiInstance.defaults.headers.Authorization
        router.push("/login")

        dispatch(loading(false))
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)