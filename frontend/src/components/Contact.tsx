import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosInstance } from '../api/baseUrl';
import { IUser } from '../models/user.model';
import { RootState } from '../store';
import Avatar from './Avatar';

function UserInfo({ isAvatarImageSet, avatarImage, userName }: Omit<IUser, '_id' | 'email'>) {
    return <>
        <div className='flex justify-start items-center gap-2 h-[8vh]'>
            {isAvatarImageSet && <Avatar width={70} avatarBlob={avatarImage}></Avatar>}
            <div> {userName}</div >
        </div>
    </>
}

type ContactProps = {
    setSelectedUser: (user: string) => void,
    selectedUser: string

}
function Contact({ setSelectedUser, selectedUser }: ContactProps) {
    const [userList, setUserList] = useState<IUser[]>([]);
    const currentUser = useSelector((state: RootState) => state.user);


    useEffect(() => {
        function getAllUsers() {
            // fetch all users
            AxiosInstance.post('/user/getAllUsers', currentUser).then(res => {
                console.log(res);
                setUserList(res.data.users);
            });
        }

        getAllUsers();

    }, [currentUser])

    return (
        <section className='bg-purple-950 text-sm text-white rounded-l-lg  w-[200px] flex flex-col justify-between items-start'>
            {/* chat list */}
            <div className='overflow-y-auto h-[500px] w-full py-2 pl-2' >{
                userList.map(user =>
                    // hover effect
                    <div key={user._id} className={`hover:bg-gradient-to-tr from-secondary rounded-lg cursor-pointer p-2 ${selectedUser === user.userName && 'bg-gradient-to-tr from-secondary'}`} onClick={() => setSelectedUser(user.userName)}>
                        <UserInfo {...user} ></UserInfo>
                    </div>)
            }</div>
            <div className='bg-blue-950 rounded-l-lg w-full p-2 flex justify-center'><UserInfo {...currentUser}></UserInfo></div>
        </section>
    )
}


export default React.forwardRef(Contact)
