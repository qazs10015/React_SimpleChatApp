import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import style from './Login.module.scss';
import { AxiosInstance } from "../../api/baseUrl";

const loginSchema = z.object({
    userName: z.coerce.string().min(1).regex(/^[a-zA-Z0-9_]+$/, '只能包含字母、數字和底線'),
    password: z.string().min(6, '密碼至少 6 位'),
});

type LoginProps = z.infer<typeof loginSchema>;

const defaultValues: LoginProps = {
    userName: '',
    password: '',
}

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginProps>({ defaultValues, resolver: zodResolver(loginSchema) });
    const redirect = useNavigate();
    const submit: SubmitHandler<LoginProps> = async (data) => {

        const response = await AxiosInstance.post('/auth/login', data);
        console.log(response);
        if (!response.data.status) alert(response.data.msg);
        else {
            alert('登入成功');
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            redirect('/home');
        }
    }

    return (
        <>
            {/* {errors.userName && JSON.stringify(errors.userName)} */}
            <div className="flex flex-col justify-center items-center  gap-3 ">
                <p className='text-white'>🚀 <strong>Create New Account</strong></p>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center  bg-opacity-80 bg-black rounded-3xl p-10 min-w-[430px]">
                    <input className={style.input} {...register('userName')} placeholder='UserName' />
                    <div className={style.errorMsg}>{errors.userName && errors.userName.message}</div>

                    <input type="password" className={style.input} {...register('password')} name='password' placeholder='Password' />
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