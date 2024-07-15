import { Outlet } from 'react-router-dom'

function Home() {

    // throw new Error("錯誤發生"); // 這會觸發錯誤邊界
    return (
        <Outlet />
    )
}

export default Home