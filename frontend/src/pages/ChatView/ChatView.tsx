import React, { useEffect } from 'react'
import { AxiosInstance } from '../../api/baseUrl'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function ChatView() {

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        function getAllUsers() {
            // fetch all users
            AxiosInstance.post('/user/getAllUsers', user).then(res => {
                console.log(res);
            });
        }

        getAllUsers();

    }, [user])


    return (
        <div className='w-[85vw] h-[70vh] bg-primary rounded-lg'></div>
    )
}

export default ChatView