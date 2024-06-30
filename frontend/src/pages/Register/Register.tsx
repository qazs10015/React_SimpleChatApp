import React from 'react'
import style from './Register.module.scss';

function Register() {
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = e.currentTarget.elements;
        console.log(data);
    }

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <form onSubmit={submit} className="flex flex-col justify-center items-center gap-2">
                <input className={style.input} type='text' name='text' placeholder='UserName' />
                <input type='email' name='email' placeholder='Email' />
                <input type='password' name='password' placeholder='Password' />
                <input type='password' name='password' placeholder='Confirm Password' />
                <button type="submit" className='bg-orange-400 p-2 rounded-md text-white'>Create Account</button>
            </form>
        </div>
    )
}

export default Register