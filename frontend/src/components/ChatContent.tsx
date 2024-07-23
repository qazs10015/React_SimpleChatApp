import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { AxiosInstance } from '../api/baseUrl'
import { useChatContext } from '../context/ChatContext'
import { IUser } from '../models/user.model'
import { RootState } from '../store'
import { Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';

type Props = {
    chatTarget: IUser,
    socket?: React.MutableRefObject<Socket | undefined>
}

function ChatContent({ chatTarget, socket }: Props) {
    const currentUser = useSelector((state: RootState) => state.user);
    const ref = useRef<HTMLDivElement>(null);
    const { sendMsg, messageList, setMessageList } = useChatContext();

    const req = useMemo(() => ({ from: currentUser._id, to: chatTarget._id }), [currentUser._id, chatTarget._id]);

    useEffect(() => {
        (async () => {
            if (sendMsg === '') {
                const response = await AxiosInstance.post('message/getAllMessage', req);
                setMessageList(response.data.messages);
            }

        })();

    }, [req, setMessageList, sendMsg]);

    useEffect(() => {
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [messageList]);

    useEffect(() => {
        if (!socket || !socket.current) return;
        console.log('socket');
        socket.current.on("receiveMsg", (data) => {
            debugger
            setMessageList((prev) => [...prev, { fromSelf: false, message: data.message }]);
        });


    }, [socket]);

    return (
        <div ref={ref} className='h-[55vh] overflow-y-auto flex flex-col px-5 py-2 gap-2'>{
            messageList.length > 0 && messageList.map((msg) => {
                return <div key={uuidv4()}>
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