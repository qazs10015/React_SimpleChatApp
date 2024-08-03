import { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import ChatContent from '../../components/ChatContent';
import ChatInput from '../../components/ChatInput';
import ChatTargetInfo from '../../components/ChatTargetInfo';
import Contact from '../../components/Contact';
import WelcomeToChat from '../../components/WelcomeToChat';
import { ChatContextProvider, useChatContext } from '../../context/ChatContext';
import { IUser } from '../../models/user.model';
import { RootState } from '../../store';


function ChatView() {
    const [chatTarget, setChatTarget] = useState<IUser | null>(null);
    const { messageList, setMessageList } = useChatContext();
    const userInfo = useSelector((state: RootState) => state.user);
    const socket = useRef<Socket>();
    useLayoutEffect(() => {
        if (userInfo._id) {
            socket.current = io('http://localhost:5000');
            socket.current.emit('addUser', userInfo._id);
        }

    }, [messageList, setMessageList, userInfo._id]);

    return (
        <section className='flex'>
            <Contact setChatTarget={setChatTarget} chatTarget={chatTarget}></Contact>
            <div className='w-[60vw] h-[70vh] bg-primary rounded-r-lg'>
                {!chatTarget ? <WelcomeToChat></WelcomeToChat> : <>
                    <ChatContextProvider>
                        <ChatTargetInfo chatTarget={chatTarget}></ChatTargetInfo>
                        <ChatContent chatTarget={chatTarget} socket={socket}></ChatContent>
                        <ChatInput chatTargetId={chatTarget._id} socket={socket}></ChatInput>
                    </ChatContextProvider>
                </>}
            </div>

        </section>

    )
}

export default ChatView