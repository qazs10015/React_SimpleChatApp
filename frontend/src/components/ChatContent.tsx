import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { AxiosInstance } from '../api/baseUrl'
import { useChatContext } from '../context/ChatContext'
import { IUser } from '../models/user.model'
import { RootState } from '../store'

type Props = {
    chatTarget: IUser
}

function ChatContent({ chatTarget }: Props) {
    const currentUser = useSelector((state: RootState) => state.user);
    const ref = useRef<HTMLDivElement>(null);
    const chatContext = useChatContext();

    const req = useMemo(() => ({ from: currentUser._id, to: chatTarget._id }), [currentUser._id, chatTarget._id]);

    useEffect(() => {
        (async () => chatContext.setMessageList((await AxiosInstance.post('message/getAllMessage', req)).data.messages))();

    }, [req, chatContext]);

    useEffect(() => {
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [chatContext.messageList]);

    return (
        <div ref={ref} className='h-[55vh] overflow-y-auto flex flex-col px-5 py-2 gap-2'>{
            chatContext.messageList.length > 0 && chatContext.messageList.map((msg, idx) => {
                return <div key={idx}>
                    <div className={`text-white ${msg.fromSelf && 'text-right'}`}>
                        <div className={`rounded-xl bg-gray-500 inline-block p-2 ${msg.fromSelf && '!bg-purple-800 '}`}>
                            {msg.message}
                        </div>
                    </div>
                </div>
            })
        }</div>
    )
}

export default ChatContent