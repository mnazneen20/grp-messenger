import { PaperPlaneRight } from 'phosphor-react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGlobalCtx } from '../context/GlobalProvider'
import MessageBox from './MessageBox'
import { uid } from 'uid'

export default function ChatContainer() {
    const chatContainerRef = useRef(null);
    const { user, socket, room } = useGlobalCtx();
    const { register, handleSubmit, setValue } = useForm();
    const [allmessages, setAllmessages] = useState([]);
    // console.log(socket)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${room._id}`, {
            credentials: 'include',
        }).then(res => res.json())
            .then(data => {
                setAllmessages(data.allmsgs)
            })
            .catch(err => console.log(err))
    }, [room])
    const submithandler = async (data) => {
        // console.log(data);
        const msgdata = {
            message: data.currentmsg,
            room: room._id,
            sender: user._id,
            time: new Date().getTime()
        }
        await socket.emit('send_messege', msgdata);
        setValue('currentmsg', '');
        // console.log(sentmsg)
        setAllmessages((prev) => [...prev, { _id: uid(16), ...msgdata }])
    }
    useEffect(() => {
        chatContainerRef.current?.scrollIntoView();
    }, [allmessages]);

    useEffect(() => {
        socket.on('receive_msg', (data) => {
            // console.log(data)
            setAllmessages((prev) => ([...prev, data]))
        })
    }, [socket])
    return (
        <div className='w-full h-full overflow-hidden flex flex-col'>
            <div className='w-full font-bold py-4 text-white uppercase bg-black shadow-down'>
                <h1 className='mx-20'>NOW OPEN GROUP - {room.roomname}</h1>
            </div>
            <div className='mx-20 h-full overflow-y-scroll flex'>
                <div className='w-full max-h-full mt-auto'>
                    {
                        allmessages.length > 0 ? allmessages.map(m => <MessageBox key={m._id} item={m} />)
                            :
                            <h1 className='text-white font-medium'>No message to show.. Send messege to start a conversation</h1>
                    }
                    <div ref={chatContainerRef}></div>
                </div>
            </div>
            <div className='mx-20 mb-10 mt-8'>
                <form className='flex py-3 bg-input rounded-lg' onSubmit={handleSubmit(submithandler)}>
                    <input id='message' type="text" placeholder='Type a message here.' className='ml-4 w-full focus:outline-none text-sm bg-transparent text-whitish'
                        {...register('currentmsg', { required: true })}
                    />
                    <button type='submit' className='bg-[#2F80ED] p-3 rounded-lg mr-2'>
                        <PaperPlaneRight weight='fill' color='#fff' size={16} />
                    </button>
                </form>
            </div>
        </div>
    )
}