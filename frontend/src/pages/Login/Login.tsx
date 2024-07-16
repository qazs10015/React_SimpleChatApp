import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AxiosInstance } from "../../api/baseUrl";
import style from './Login.module.scss';
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

// fix circular json error
// const formatErrors = (errors: Record<string, FieldError>): object => {
//     if (Object.keys(errors).length === 0) return {};
//     return Object.keys(errors).map(key => {
//         return {
//             [key]: { message: errors[key].message, type: errors[key].type }
//         }
//     })
// };

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
    const dispatch = useDispatch();

    const submit: SubmitHandler<LoginProps> = async (data) => {

        const response = await AxiosInstance.post('/auth/login', data);
        if (!response.data.status) alert(response.data.msg);
        else {
            alert('登入成功');
            dispatch(setUser(response.data.user));
            if (response.data.user.isAvatarImageSet) redirect('/chat');
            else redirect('/setAvatar');
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center  gap-3 ">
                {/* <pre>{JSON.stringify(formatErrors(errors))}</pre> */}
                <p className='text-white'>🚀 <strong>Create New Account</strong></p>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center  bg-opacity-80 bg-black rounded-3xl p-10 min-w-[430px]">
                    <input className={style.input} {...register('userName')} placeholder='UserName' />
                    <div className={style.errorMsg}> <ErrorMessage errors={errors} name="userName" /></div>

                    <input type="password" className={style.input} {...register('password')} name='password' placeholder='Password' />
                    <div className={style.errorMsg}> <ErrorMessage errors={errors} name="password" /></div>

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