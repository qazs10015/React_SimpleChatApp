import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosInstance } from '../api/baseUrl';
import { useChatContext } from '../context/ChatContext';
import { useDebounce } from '../customHooks/useDebounce';
import { RootState } from '../store';
import { Socket } from 'socket.io-client';

type Props = {
    chatTargetId: string,
    socket?: React.MutableRefObject<Socket | undefined>
}

function ChatInput({ chatTargetId, socket }: Props) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { sendMsg, setSendMsg } = useChatContext();
    const ref = React.useRef<HTMLInputElement>(null);
    const user = useSelector((state: RootState) => state.user);
    const [submitData, setSubmitData] = useState(false);
    const debouncedValue = useDebounce(sendMsg);

    // Emoji click handler
    const onEmojiClick = (emojiData: EmojiClickData) => {
        setSendMsg(sendMsg + emojiData.emoji);
        // refocus on input
        ref.current?.focus();
    };

    const req = useMemo(() => ({ from: user._id, to: chatTargetId, message: debouncedValue }), [user._id, chatTargetId, debouncedValue]);
    useEffect(() => {
        if (!submitData || req.message === '') return;
        const sendMessage = async () => {
            // send message
            await AxiosInstance.post('/message/addMessage', req);
            // clear input
            setSendMsg('');
            // emit to socket server
            if (socket && socket.current) socket.current.emit('sendMsg', req);

            // close submitData
            setSubmitData(false);
        };

        sendMessage();
    }, [req, setSendMsg, submitData, socket]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (sendMsg.trim() === '') return;

        setSubmitData(true);
    };

    return (
        <form onSubmit={handleSubmit} className='flex gap-2 justify-center items-center px-2' >
            <div className='cursor-pointer relative' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{showEmojiPicker ? '💩' : '😄'}
                {showEmojiPicker && <div className='absolute top-[-420px]'>
                    <EmojiPicker lazyLoadEmojis={true} width={300} height={400} previewConfig={{ showPreview: false }} onEmojiClick={onEmojiClick}></EmojiPicker>
                </div>}
            </div>

            <input ref={ref} type="text" placeholder='Type message here' className='rounded-lg w-full p-2 outline-none' autoFocus value={sendMsg} onChange={(e) => setSendMsg(e.target.value)} />
            <button type='submit' className='text-white bg-secondary p-2 rounded-lg'>Send</button>
        </form>
    )
}

export default ChatInput