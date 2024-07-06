import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import style from './Login.module.scss';

const loginSchema = z.object({
    userName: z.string().min(1),
    password: z.string().min(6),
});

type LoginProps = z.infer<typeof loginSchema>;


const defaultValues: LoginProps = {
    userName: '',
    password: '',
}



function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginProps>({ defaultValues, resolver: zodResolver(loginSchema) });
    const redirect = useNavigate();
    const submit: SubmitHandler<LoginProps> = (data) => {
        console.log(data);
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center  gap-3 ">
                <p className='text-white'>🚀 <strong>Create New Account</strong></p>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center  bg-opacity-80 bg-black rounded-3xl p-10 min-w-[430px]">
                    <input className={style.input} {...register('userName')} name='text' placeholder='UserName' />
                    <div className={style.errorMsg}>{errors.userName && errors.userName.message}</div>

                    <input className={style.input} {...register('password')} name='password' placeholder='Password' />
                    <div className={style.errorMsg}>{errors.password && errors.password.message}</div>

                    <div className='text-center mt-5'>
                        <button type="submit" className='p-2 rounded-md bg-primary text-white w-full hover:bg-[#4f58ff] transition ease-in-out duration-700'>Login</button>
                        <span className='text-white'>or</span>
                        <button className='p-2 rounded-md bg-white text-primary w-full hover:bg-secondary hover:text-white transition ease-in-out duration-700' onClick={() => redirect('/register')}>Create Account</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Login