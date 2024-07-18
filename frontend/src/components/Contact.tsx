import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosInstance } from '../api/baseUrl';
import { IUser } from '../models/user.model';
import { RootState } from '../store';
import Avatar from './Avatar';

function UserInfo({ isAvatarImageSet, avatarImage, userName }: Omit<IUser, '_id' | 'email'>) {
    return <>
        <div className='flex justify-start items-center rounded-lg gap-2 '>
            {isAvatarImageSet && <div className='w-[5vw]'> <Avatar avatarBlob={avatarImage}></Avatar></div>}
            < div > {userName}</div >
        </div>
    </>
}

function Contact() {
    const [userList, setUserList] = useState<IUser[]>([]);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        function getAllUsers() {
            // fetch all users
            AxiosInstance.post('/user/getAllUsers', user).then(res => {
                console.log(res);
                setUserList(res.data.users);
            });
        }

        getAllUsers();

    }, [user])

    return (
        <section className='bg-secondary text-white rounded-l-lg p-3 w-[14vw] flex flex-col justify-between items-start'>
            {/* overflow */}
            <div>{userList.map(user => <UserInfo key={user._id} {...user} ></UserInfo>)}</div>
            <UserInfo {...user}></UserInfo>
        </section>
    )
}

export default Contact
