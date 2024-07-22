import { useState } from 'react';
import ChatContent from '../../components/ChatContent';
import ChatInput from '../../components/ChatInput';
import ChatTargetInfo from '../../components/ChatTargetInfo';
import Contact from '../../components/Contact';
import WelcomeToChat from '../../components/WelcomeToChat';
import { ChatContextProvider } from '../../context/ChatContext';
import { IUser } from '../../models/user.model';


function ChatView() {
    const [chatTarget, setChatTarget] = useState<IUser | null>(null);

    return (
        <section className='flex'>
            <Contact setChatTarget={setChatTarget} chatTarget={chatTarget}></Contact>
            <div className='w-[60vw] h-[70vh] bg-primary rounded-r-lg'>
                {!chatTarget ? <WelcomeToChat></WelcomeToChat> : <>
                    <ChatTargetInfo chatTarget={chatTarget}></ChatTargetInfo>
                    <ChatContextProvider>
                        <ChatContent chatTarget={chatTarget}></ChatContent>
                        <ChatInput chatTargetId={chatTarget._id}></ChatInput>
                    </ChatContextProvider>
                </>}
            </div>

        </section>

    )
}

export default ChatView