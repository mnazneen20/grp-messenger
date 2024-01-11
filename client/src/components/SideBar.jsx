import { SignOut } from 'phosphor-react'
import React from 'react'
import userImg from '../assets/user.png'
import { useGlobalCtx } from '../context/GlobalProvider'
import GrpinfoTab from './GrpinfoTab'

export default function SideBar() {
    const { user, logout } = useGlobalCtx();
    return (
        <div className='flex flex-col h-full'>
            <GrpinfoTab />
            <div className='mt-auto flex items-center gap-4 p-4 bg-blackest max-h-[63px]'>
                <img src={userImg} alt="current user pic" className='h-10 w-10 rounded-lg' />
                <p className='text-grey font-bold capitalize'>{user.username}</p>
                <button onClick={() => logout()} className='ml-auto text-lg'>
                    <SignOut weight='bold' color='#ffffff' />
                </button>
            </div>
        </div>
    )
}
