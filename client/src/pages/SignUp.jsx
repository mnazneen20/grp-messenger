import React from 'react'
import Input from '../components/Input'
import { At, ChatCircleDots, EnvelopeSimple, Lock } from 'phosphor-react'
import { useForm } from 'react-hook-form'

export default function SignUp() {
    const { register, handleSubmit } = useForm();
    const onsubmit = (data) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
            credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
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
                    <Input id={'username'} placeholder={'Username'} icon={<At size={20} weight='fill' />} register={() => register('username', { required: true })} />
                    <Input id={'email'} placeholder={'Email'} icon={<EnvelopeSimple size={20} weight='fill' />} register={() => register('email', { required: true })} />
                    <Input id={'password'} type='password' placeholder={'Password'} icon={<Lock size={20} weight='fill' />} register={() => register('password', { required: true })} />
                    <button type='submit' className='w-full bg-blue-500 p-2 rounded-md'>Sign up</button>
                </form>
                <div className='text-center pt-24 pb-6'>
                    <p>Already have an account? <a className='text-blue-500' href='/login'>Login</a></p>
                </div>
            </div>
        </div>
    )
}
