import { useState } from 'react';
import Contact from '../../components/Contact';


function ChatView() {
    const [selectedUser, setSelectedUser] = useState('');
    console.log(selectedUser);
    return (
        <section className='flex'>
            <Contact setSelectedUser={setSelectedUser} selectedUser={selectedUser}></Contact>
            <div className='w-[60vw] h-[70vh] bg-primary rounded-r-lg'></div>
        </section>
    )
}

export default ChatView