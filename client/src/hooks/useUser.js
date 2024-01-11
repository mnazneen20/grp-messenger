import { useEffect, useState } from "react";
import io from 'socket.io-client'

export default function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const me = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                    socket.emit('joinroom', '65906cc8855bc69f80601c60');
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            })
    }
    useEffect(() => {
        me();
    }, [])

    const logout = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, { credentials: 'include' })
            .then((res) => {
                if (res.ok) {
                    setUser(null);
                }
            })
    }

    return {
        user,
        setUser,
        logout,
        loading,
        setLoading,
    }
}

export const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
    withCredentials: true,
})