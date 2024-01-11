import React from "react";
import { useGlobalCtx } from "../context/GlobalProvider";

export default function MessageBox({ item }) {
    const { user } = useGlobalCtx();
    const showtime = (time) => {
        let showw;
        const current = new Date();
        const msgtime = new Date(time);
        const clock = msgtime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        if ((current.getDate() - msgtime.getDate()) === 0) {
            showw = `today at ${clock}`
        } else if ((current.getDate() - msgtime.getDate()) === 1) {
            showw = `yesterday at ${clock}`
        }
        else {
            showw = `${msgtime.toDateString()} at ${clock}`
        }
        return showw;
    }
    return (
        <div className={`flex gap-7 mt-10`}>
            {/* <img src={`/images/${item.image}`} alt="message user" className='w-10 h-10 rounded-lg' /> */}
            <img src='/images/user.png' alt="message user" className='w-10 h-10 rounded-lg' />
            <div>
                <div className='text-grey flex gap-3 items-center'>
                    <p className='font-bold capitalize'>{item.sender.username || user.username}</p>
                    <p className='text-xs mt-1'>{showtime(parseInt(item.time))}</p>
                </div>
                <p className='text-whitish font-medium'>{item.message}</p>
            </div>
        </div>
    )
}