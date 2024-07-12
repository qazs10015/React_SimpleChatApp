import { useEffect, useState } from 'react';
import { AxiosInstance } from '../../api/baseUrl';

// free API for random avatar
const avatarAPI = 'https://api.multiavatar.com/45678945';

async function avatarPromise() {
    const promises = [];
    for (let index = 0; index < 4; index++) {
        promises.push(AxiosInstance.get(`${avatarAPI}/${Math.round(Math.random() * 1000)}`))
    }

    return await Promise.all(promises);
}

function SetAvatar() {

    const [avatarList, setAvatarList] = useState<string[]>([])

    const [avatar, setAvatar] = useState<string>('');


    const refresh = async () => {
        setAvatarList((await avatarPromise()).map(res => res.data));
    }

    useEffect(() => {
        refresh();
    }, []);

    const pickAvatar = (avatar: string) => setAvatar(avatar);

    return (
        <>
            <div className='text-white text-center text-4xl mb-4'>Choose Your Favorite Avatar</div>
            <div className='flex flex-col justify-center items-center gap-6'>
                <div className='flex gap-10'>
                    {avatarList.map((item, index) => {
                        // encode svg info to base64 and show it
                        return (
                            <img className={`w-[120px] h-[120px] rounded-full cursor-pointer p-1 border-4 border-transparent hover:border-yellow-400 duration-700 ease-out ${avatar === btoa(item) && 'border-yellow-400'}`} key={index} src={`data:image/svg+xml;base64,${btoa(item)}`} onClick={() => pickAvatar(btoa(item))}></img>
                        )
                    })}
                </div>
                <div className='flex gap-4'>
                    <button className='p-2 w-[5rem] rounded-md bg-white text-primary hover:bg-secondary hover:text-white transition ease-in-out duration-700' onClick={() => refresh()}>Refresh</button>
                    <button className='p-2 w-[5rem] rounded-md bg-primary text-white hover:bg-secondary hover:text-white transition ease-in-out duration-700' onClick={() => refresh()}>Pick it!</button>
                </div>
            </div>


        </>
    )
}

export default SetAvatar