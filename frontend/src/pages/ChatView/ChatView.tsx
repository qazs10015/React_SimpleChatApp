import { useState } from 'react';
import ChatTargetInfo from '../../components/ChatTargetInfo';
import Contact from '../../components/Contact';
import WelcomeToChat from '../../components/WelcomeToChat';
import { IUser } from '../../models/user.model';


function ChatView() {
    const [chatTarget, setChatTarget] = useState<IUser | null>(null);
    console.log(chatTarget);
    return (
        <section className='flex'>
            <Contact setChatTarget={setChatTarget} chatTarget={chatTarget}></Contact>
            <div className='w-[60vw] h-[70vh] bg-primary rounded-r-lg'>
                {chatTarget ? <ChatTargetInfo chatTarget={chatTarget}></ChatTargetInfo> : <WelcomeToChat></WelcomeToChat>}
            </div>
        </section>
    )
}

export default ChatView