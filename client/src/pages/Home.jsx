import React from 'react'
import ChatContainer from "../components/ChatContainer"
import SideBar from "../components/SideBar"

export default function Home() {
    return (
        <div className="bg-black w-full h-screen flex">
            <SideBar />
            <ChatContainer />
        </div>
    )
}
