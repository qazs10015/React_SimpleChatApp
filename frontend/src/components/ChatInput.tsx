import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosInstance } from '../api/baseUrl';
import { useChatContext } from '../context/ChatContext';
import { RootState } from '../store';

type Props = {
    chatTargetId: string
}

function ChatInput({ chatTargetId }: Props) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatContext = useChatContext();
    const ref = React.useRef<HTMLInputElement>(null);
    const user = useSelector((state: RootState) => state.user);

    // Emoji click handler
    const onEmojiClick = (emojiData: EmojiClickData) => {
        chatContext.setSendMsg(chatContext.sendMsg + emojiData.emoji);
        // refocus on input
        ref.current?.focus();
    };

    const sendMessage = (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();

        AxiosInstance.post('/message/addMessage', { from: user._id, to: chatTargetId, message: chatContext.sendMsg });
        chatContext.setSendMsg('');
    }


    return (
        <form onSubmit={sendMessage} className='flex gap-2 justify-center items-center px-2' >
            <div className='cursor-pointer relative' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{showEmojiPicker ? '💩' : '😄'}
                {showEmojiPicker && <div className='absolute top-[-420px]'>
                    <EmojiPicker lazyLoadEmojis={true} width={300} height={400} previewConfig={{ showPreview: false }} onEmojiClick={onEmojiClick}></EmojiPicker>
                </div>}
            </div>

            <input ref={ref} type="text" placeholder='Type message here' className='rounded-lg w-full p-2 outline-none' autoFocus value={chatContext.sendMsg} onChange={(e) => chatContext.setSendMsg(e.target.value)} />
            <button type='submit' className='text-white bg-secondary p-2 rounded-lg'>Send</button>
        </form>
    )
}

export default ChatInput