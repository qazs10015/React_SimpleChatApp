import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import style from './Register.module.scss';

const registerSchema = z.object({
    userName: z.coerce.number().gte(18, 'Must be 18 and above'),
    email: z.string().email('無效的 email 格式'),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
});

type RegisterProps = z.infer<typeof registerSchema>;


const defaultValues: RegisterProps = {
    userName: 0,
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
            <div className="flex flex-col justify-center items-center  gap-3 ">
                <p className='text-white'>🚀 <strong>Welcome to Chat App</strong></p>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center  bg-opacity-80 bg-black rounded-3xl p-10 min-w-[440px]">
                    <input className={style.input} {...register('userName', {
                        setValueAs: v => v === "" ? undefined : Number(v)
                    })} placeholder='UserName' />
                    <div className={style.errorMsg}>{errors.userName && errors.userName.message}</div>

                    <input className={style.input} {...register('email')} placeholder='Email' />
                    <div className={style.errorMsg}>{errors.email && errors.email.message}</div>

                    <input className={style.input} {...register('password')} placeholder='Password' />
                    <div className={style.errorMsg}>{errors.password && errors.password.message}</div>

                    <input className={style.input} {...register('password')} placeholder='Confirm Password' />
                    <div className={style.errorMsg}>{errors.password && errors.password.message}</div>

                    <div className='text-center mt-5'>
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