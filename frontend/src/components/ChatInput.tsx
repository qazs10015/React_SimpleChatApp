import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import React, { useState } from 'react'

function ChatInput() {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');
    const ref = React.useRef<HTMLInputElement>(null);

    // Emoji click handler
    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMsg(msg + emojiData.emoji);
        // re focus on input
        ref.current?.focus();
    };

    return (
        <div className='flex gap-2 justify-center items-center px-2 '>
            <div className='cursor-pointer relative' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{showEmojiPicker ? '💩' : '😄'}
                {showEmojiPicker && <div className='absolute top-[-420px]'>
                    <EmojiPicker lazyLoadEmojis={true} width={300} height={400} previewConfig={{ showPreview: false }} onEmojiClick={onEmojiClick}></EmojiPicker>
                </div>}
            </div>

            <input ref={ref} type="text" placeholder='Type message here' className='rounded-lg w-full p-2 outline-none' autoFocus value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button className='text-white bg-secondary p-2 rounded-lg'>Send</button>
        </div>
    )
}

export default ChatInput