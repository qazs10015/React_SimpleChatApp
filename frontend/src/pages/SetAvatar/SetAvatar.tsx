import { useEffect, useState } from 'react';
import { AxiosInstance } from '../../api/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar';

// free API for random avatar
const avatarAPI = 'https://api.multiavatar.com/45678945';

async function avatarPromise() {
    const promises = [];
    for (let index = 0; index < 4; index++) {
        promises.push(AxiosInstance.get(`${avatarAPI}/${Math.round(Math.random() * 1000)}`));
    }

    return await Promise.all(promises);
}

function SetAvatar() {

    const [avatarList, setAvatarList] = useState<string[]>([]);
    const redirect = useNavigate();

    const [avatar, setAvatar] = useState<string>('');

    const userInfo = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    console.log(userInfo);

    const refresh = async () => setAvatarList((await avatarPromise()).map(res => res.data));

    useEffect(() => {
        if (userInfo.isAvatarImageSet) redirect('/chat');
        else refresh();
    }, [redirect, userInfo.isAvatarImageSet]);

    const pickAvatar = (avatar: string) => setAvatar(avatar);

    const setProfileAvatar = async () => {
        if (!avatar) alert('請選擇喜愛的頭像');
        else {
            const user = { ...userInfo, avatarImage: avatar, isAvatarImageSet: true };

            dispatch(setUser(user));
            console.log(user);
            const response = await AxiosInstance.post('/user/update', user);
            if (response.data.status) {
                const { msg, user } = response.data;
                alert(msg);
                dispatch(setUser(user));
                redirect('/chat');
            }
        }


    };

    return (
        <>
            <div className='text-white text-center text-4xl mb-4'>Choose Your Favorite Avatar</div>
            <div className='flex flex-col justify-center items-center gap-6'>
                <div className='flex gap-10'>
                    {avatarList.map((item, index) => {
                        // encode svg info to base64 and show it
                        return (
                            <div className={`rounded-full cursor-pointer p-1 border-4 border-transparent hover:border-yellow-400 duration-700 ease-out`}>
                                <Avatar currentAvatar={avatar} avatarBlob={item} key={index} pickAvatar={pickAvatar} ></Avatar>
                            </div>
                        )
                    })}
                </div>
                <div className='flex gap-4'>
                    <button className='p-2 w-[5rem] rounded-md bg-white text-primary hover:bg-secondary hover:text-white transition ease-in-out duration-700' onClick={() => refresh()}>Refresh</button>
                    <button className='p-2 w-[5rem] rounded-md bg-primary text-white hover:bg-secondary hover:text-white transition ease-in-out duration-700' onClick={() => setProfileAvatar()}>Pick it!</button>
                </div>
            </div>


        </>
    )
}

export default SetAvatar