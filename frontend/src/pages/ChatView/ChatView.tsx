import { useState } from 'react';
import ChatTargetInfo from '../../components/ChatTargetInfo';
import Contact from '../../components/Contact';
import WelcomeToChat from '../../components/WelcomeToChat';
import { IUser } from '../../models/user.model';
import ChatContent from '../../components/ChatContent';
import ChatInput from '../../components/ChatInput';


function ChatView() {
    const [chatTarget, setChatTarget] = useState<IUser | null>(null);
    return (
        <section className='flex'>
            <Contact setChatTarget={setChatTarget} chatTarget={chatTarget}></Contact>
            <div className='w-[60vw] h-[70vh] bg-primary rounded-r-lg'>
                {!chatTarget ? <WelcomeToChat></WelcomeToChat> : <>
                    <ChatTargetInfo chatTarget={chatTarget}></ChatTargetInfo>
                    <ChatContent></ChatContent>
                    <ChatInput></ChatInput>
                </>}
            </div>
        </section>
    )
}

export default ChatView