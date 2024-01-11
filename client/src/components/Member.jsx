import React from 'react'

export default function Member({ name, image, roominfo, clickHandler }) {
    return (
        <div className='flex gap-5 items-center mb-6 cursor-pointer' onClick={() => { clickHandler(roominfo) }}>
            <img src={`/images/${image}`} alt="user pic" className='h-8 w-8 rounded-lg' />
            <p className='text-grey font-bold'>{name}</p>
        </div>
    )
}
