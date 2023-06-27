
import React from 'react'
import DefaultLayout from '@/components/templates/layout/DefaultLayout'
import LogoMedium from '@/components/molecules/LogoMedium'
import NavBar from '@/components/organisms/layout/NavBar'

interface MainLayoutProps{
    sidebar :  React.ReactNode
    content :  React.ReactNode
}

const MainLayout = ({sidebar, content}: MainLayoutProps) =>{
    
    return(
        <DefaultLayout>
            <div className='flex'>
                <div className='hidden md:block w-[280px] min-w-[280px] h-screen bg-primary'>
                    <div className='h-[64px] w-full'>
                        <div className='mx-auto pt-[10px]'>
                            <LogoMedium />
                        </div>
                    </div>
                    <hr className="mx-[35px] h-[0.5px] border-white" />
                    <div style={{height: "calc(100vh - 64px)"}}>
                        {sidebar}
                    </div>
                </div>
                <div className='flex-grow h-screen bg-white'>
                    <div className='h-[64px] w-full'>
                        <NavBar />
                    </div>
                    <hr className="mx-[24px] h-[0.5px] border-[#33333333]" />
                    <div style={{height: "calc(100vh - 64px)"}}>
                        {content}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default MainLayout;