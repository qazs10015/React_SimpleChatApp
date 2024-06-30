
function Login() {

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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login