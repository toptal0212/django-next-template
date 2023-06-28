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

const COOKIE_NAME = process.env.COOKIE_NAME as string


export const AuthProvider = ({ children } : AuthProviderProps) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [user, setUser] = useState<IUser|null>(null)

    useEffect(() => {
        async function loadUserFromCookies() {
            deleteCookie(COOKIE_NAME)   
            if(hasCookie(COOKIE_NAME)){           
                const token = JSON.parse(getCookie(COOKIE_NAME) as string)
                if (token) {
                    apiInstance.defaults.headers.Authorization = `Bearer ${token.access}`
                    const res = await getRequest(`/me`)
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
        console.log("asdf",COOKIE_NAME)
        loadUserFromCookies()
        dispatch(loading(false))
    }, [])

    const login = async (credientail: LoginPayload, callback: (perm: string) => void) => {
        dispatch(loading(true))  

        deleteCookie(COOKIE_NAME)   

        const response = await apiInstance.post('/auth/login', credientail)
        if(response.status === 200){       
            setCookie(COOKIE_NAME, JSON.stringify(response.data))
            apiInstance.defaults.headers.Authorization = `Bearer ${response.data.access}`
            const res = await apiInstance.get(`/me`)
            if(res.status === 200){
                setUser(res.data)
                callback(res.data.me.permission)
                
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

        deleteCookie(COOKIE_NAME)
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