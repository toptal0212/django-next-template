
import React from 'react'
import { useEffect } from "react"
import DefaultLayout from './DefaultLayout'

interface LoginLayoutProps{
    children :  React.ReactNode
}

const LoginLayout = ({children}: LoginLayoutProps) =>{
    
    return(
        <DefaultLayout>
            <div className='w-full h-screen bg-primary flex items-center justify-center'>
                {children}
            </div>
        </DefaultLayout>
    )
}

export default LoginLayout;