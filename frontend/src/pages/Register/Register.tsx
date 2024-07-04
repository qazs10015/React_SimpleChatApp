import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import style from './Register.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
    text: z.string().min(1),
    email: z.string().email('無效的 email 格式'),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
});

type RegisterProps = z.infer<typeof registerSchema>;


const defaultValues: RegisterProps = {
    text: '',
    email: '',
    password: '',
    confirmPassword: ''
}


function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterProps>({ defaultValues, resolver: zodResolver(registerSchema) });
    const redirect = useNavigate();

    const submit: SubmitHandler<RegisterProps> = (data) => {
        console.log(data);

    }

    return (
        <>
            {errors.email && <div>{errors.email.message}</div>}
            <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-3">
                <p className='text-white'>🚀 <strong>Welcome to Chap App</strong></p>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center items-center gap-8 bg-opacity-80 bg-black rounded-3xl px-16 py-12">
                    <input className={style.input} {...register('text')} name='text' placeholder='UserName' />
                    <input className={style.input} {...register('email')} name='email' placeholder='Email' />
                    <input className={style.input} {...register('password')} name='password' placeholder='Password' />
                    <input className={style.input} {...register('password')} name='confirmPassword' placeholder='Confirm Password' />
                    <div className='text-center'>
                        <button type="submit" className='p-2 rounded-md bg-primary text-white w-full hover:bg-[#4f58ff] transition ease-in-out duration-700'>Create Account</button>
                        <span className='text-white'>or</span>
                        <button className='p-2 rounded-md bg-white text-primary w-full hover:bg-secondary hover:text-white transition ease-in-out duration-700' onClick={() => redirect('/login')}>Login</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Register