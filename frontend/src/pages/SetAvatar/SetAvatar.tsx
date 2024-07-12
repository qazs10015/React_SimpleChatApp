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

    const [avatars, setAvatars] = useState<string[]>([]);

    useEffect(() => {
        // just fetch img data via IIFE, no need declare variable
        (async () => setAvatars((await avatarPromise()).map(res => res.data)))();
    }, []);

    return (
        <>
            <div className='text-white text-4xl'>Choose your favorite avatar</div>
            {avatars.map((avatar, index) => {
                // encode svg info to base64 and show it
                return <img key={index} src={`data:image/svg+xml;base64,${btoa(avatar)}`}></img>
            })}

        </>
    )
}

export default SetAvatar