import { useNavigate } from "react-router-dom";

function Login() {
    const redirect = useNavigate();
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = e.currentTarget.elements;
        console.log(data);
    }
    return (
        <>
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <form onSubmit={submit} className="flex flex-col justify-center items-center gap-2 text-orange-400">
                    <input type='text' name='text' placeholder='UserName' />
                    <input type='email' name='email' placeholder='Email' />
                    <input type='password' name='password' placeholder='Password' />
                    <input type='password' name='password' placeholder='Confirm Password' />
                    <button type="submit" className='p-2 rounded-md bg-primary text-white w-full hover:bg-[#4f58ff] transition ease-in-out duration-700'>Login</button>
                    <span className='text-white'>or</span>
                    <button className='p-2 rounded-md bg-white text-primary w-full hover:bg-secondary hover:text-white transition ease-in-out duration-700' onClick={() => redirect('/register')}>Create Account</button>
                </form>
            </div>
        </>
    )
}

export default Login