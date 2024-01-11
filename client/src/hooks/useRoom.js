import { useState } from "react";

export default function useRoom() {
    const [allrooms, setAllrooms] = useState(null);
    const [room, setRoom] = useState(
        {
            _id: "65906cc8855bc69f80601c60",
            roomname: "Welcome",
            roomdesc: "A vibrant and inclusive chat group dedicated to extending a warm welcome to newcomers on our platform! Join this friendly community where members from all walks of life come together to share experiences, ask questions, and make new connections.",
        }
    );

    const getRooms = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setAllrooms(data.rooms);
            })
            .catch((err) => console.log(err));
    }

    return {
        allrooms,
        room,
        setRoom,
        getRooms,
    }
}