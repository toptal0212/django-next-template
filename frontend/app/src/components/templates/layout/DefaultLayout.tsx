"use client"

import React, { useEffect } from "react"
import Spinner from "@/components/molecules/Spinner"
import { useAppSelector } from "@/redux/hooks"



interface DefaultLayoutProps{
    children :  React.ReactNode
}

const DefaultLayout = ({children}: DefaultLayoutProps) =>{
    const loading = useAppSelector(state => state.utilReducer.loading)
    
    return(   
        <main>
            {children}
            <Spinner className={`${loading ? "z-[10000] opacity-100" : "z-[-1] opacity-0"} `} />
        </main>
    )
}

export default DefaultLayout;