import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosInstance } from '../api/baseUrl';
import { IUser } from '../models/user.model';
import { RootState } from '../store';
import UserInfo from './UserInfo';

type ContactProps = {
    setChatTarget: (user: IUser) => void;
    chatTarget: IUser | null;
}

function Contact({ setChatTarget, chatTarget }: ContactProps) {
    const [userList, setUserList] = useState<IUser[]>([]);
    const currentUser = useSelector((state: RootState) => state.user);


    useEffect(() => {
        function getAllUsers() {
            // fetch all users
            AxiosInstance.post('/user/getAllUsers', currentUser).then(res => setUserList(res.data.users));
        }

        getAllUsers();

    }, [currentUser])

    return (
        <section className='bg-purple-950 text-sm text-white rounded-l-lg  w-[200px] flex flex-col justify-between items-start'>
            {/* chat list */}
            <div className='overflow-y-auto h-[550px] w-full py-2' >{
                userList.map(user =>
                    // hover effect
                    <div key={user._id} className={`hover:bg-gradient-to-tr from-secondary rounded-l-lg cursor-pointer p-2 ${chatTarget && chatTarget.userName === user.userName && 'bg-gradient-to-tr from-secondary'}`} onClick={() => setChatTarget(user)}>
                        <UserInfo {...user} ></UserInfo>
                    </div>)
            }</div>
            <div className='bg-blue-950 rounded-l-lg w-full p-2 flex justify-center'><UserInfo {...currentUser}></UserInfo></div>
        </section>
    )
}


export default React.memo(Contact)
