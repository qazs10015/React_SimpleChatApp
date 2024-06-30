
function Login() {


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = e.currentTarget.elements;
        console.log(data);
    }
    return (
        <>
            <form onSubmit={submit}>
                <input type='text' name='text' placeholder='UserName' />
                <input type='email' name='email' placeholder='Email' />
                <input type='password' name='password' placeholder='Password' />
                <input type='password' name='password' placeholder='Confirm Password' />
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export default Login