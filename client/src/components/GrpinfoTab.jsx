import { ChatCircleDots } from 'phosphor-react'
import React, { useEffect } from 'react'
import { useGlobalCtx } from '../context/GlobalProvider'
import Member from './Member'
import { socket } from '../hooks/useUser'

export default function GrpinfoTab() {
    const { allrooms, room, setRoom, getRooms } = useGlobalCtx();
    const clickHandler = (room) => {
        setRoom(room);
        socket.emit('joinroom', room._id);
    }
    useEffect(() => {
        getRooms();
    }, [])
    return (
        <div className='w-[324px] h-full overflow-hidden text-whitish bg-blacker flex flex-col'>
            <div className='w-full font-bold p-4 shadow-down'>
                <button className='flex justify-start gap-4 items-center'>
                    <ChatCircleDots weight="bold" />
                    <span>MESSENGER</span>
                </button>
            </div>
            <div className='pt-4 pl-6 pr-2'>
                <h1 className='w-full font-bold text-white uppercase pt-6 pb-4'>{room.roomname}</h1>
                <p className='text-sm mb-6'>{room.roomdesc}</p>
                <h2 className='font-bold text-white uppercase py-4'>All Groups</h2>
            </div>
            <div className='overflow-y-scroll pl-6 h-full pt-2'>
                {
                    allrooms && allrooms.map(m => <Member clickHandler={clickHandler} roominfo={m} key={m._id} name={m.roomname} image={'grp.png'} />)
                }
            </div>
        </div>
    )
}
