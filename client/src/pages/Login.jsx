import React, { useState } from 'react'
import Input from '../components/Input'
import { ChatCircleDots, EnvelopeSimple, Lock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useGlobalCtx } from '../context/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import DemoBtn from '../components/Demobtn';

export default function Login() {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { setUser, setLoading } = useGlobalCtx();
    const onsubmit = (data) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.user) {
                    setUser(data.user)
                    setLoading(false)
                }
            })
            .catch((err) => console.log(err))
            .finally(() => navigate('/'))
    }
    const handleBtnSubmit = () => {
        setDisable(true);
        const data = {
            email: "demo@gmail.com",
            password: "demo@gmail.com"
        }
        onsubmit(data)
    }
    return (
        <div className='w-full h-screen flex justify-center items-center text-white p-8'>
            <div className='max-w-[360px] border-2 border-whitish/80 pt-10 px-6 rounded-xl'>
                <h1 className='text-xl font-extrabold pb-6 flex items-center gap-3'>
                    <ChatCircleDots size={24} />
                    <span>MESSENGER</span>
                </h1>
                <p className='text-lg font-medium'>Join the comminity that helps build your dreams.</p>
                <form className='flex flex-col gap-4 pt-10' onSubmit={handleSubmit(onsubmit)}>
                    <Input id={'email'} placeholder={'Email'} icon={<EnvelopeSimple size={20} weight='fill' />} register={() => register('email', { required: true })} />
                    <Input id={'password'} type='password' placeholder={'Password'} icon={<Lock size={20} weight='fill' />} register={() => register('password', { required: true })} />
                    <button type='submit' className='w-full bg-blue-500 p-2 rounded-md'>Login</button>
                    <DemoBtn handleBtnSubmit={handleBtnSubmit} disable={disable} />
                </form>
                <div className='text-center pt-24 pb-6'>
                    <p>Don't have an account? <a className='text-blue-500' href='/signup'>SignUp</a></p>
                </div>
            </div>
        </div>
    )
}
