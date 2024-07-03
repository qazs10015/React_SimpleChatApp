import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.scss';
import { useForm } from 'react-hook-form';

interface RegisterProps {
    text: string;
    email: string;
    password: string;
    confirmPassword: string;

}

const defaultValues: RegisterProps = {
    text: '',
    email: '',
    password: '',
    confirmPassword: ''
}


function Register() {
    const { register, handleSubmit } = useForm({ defaultValues });
    const redirect = useNavigate();

    const submit = (data: RegisterProps) => {
        console.log(data);
        // e.preventDefault();
        // const formElements = e.currentTarget.elements;
        // const formData: { [key: string]: string } = {};
        // for (let i = 0; i < formElements.length; i++) {
        //     const input = formElements[i] as HTMLInputElement;
        //     if (input.name && input.type !== 'button' && input.type !== 'submit') {
        //         formData[input.name] = input.value;
        //     }
        // }
        // console.log(formData);
    }

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-3">
            <p className='text-white'>🚀 <strong>Welcome to Chap App</strong></p>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center items-center gap-8 bg-opacity-80 bg-black rounded-3xl px-16 py-12">
                <input className={style.input} type='text' {...register('text')} placeholder='UserName' />
                <input className={style.input} type='email' {...register('email')} placeholder='Email' />
                <input className={style.input} type='password' {...register('password')} placeholder='Password' />
                <input className={style.input} type='password' {...register('confirmPassword')} placeholder='Confirm Password' />
                <div className='text-center'>
                    <button type="submit" className='p-2 rounded-md bg-primary text-white w-full hover:bg-[#4f58ff] transition ease-in-out duration-700'>Create Account</button>
                    <span className='text-white'>or</span>
                    <button className='p-2 rounded-md bg-white text-primary w-full hover:bg-secondary hover:text-white transition ease-in-out duration-700' onClick={() => redirect('/login')}>Login</button>
                </div>
            </form>

        </div>
    )
}

export default Register