import React, { createContext, useContext, useState } from 'react';
import { IMessage } from '../models/message.model';

interface ContextValue {
    sendMsg: string;
    setSendMsg: (msg: string) => void;
    messageList: IMessage[];
    setMessageList: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const context = createContext<ContextValue>({
    sendMsg: '',
    setSendMsg: (): void => { },
    messageList: [],
    setMessageList: (): void => { }
});

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
    // update child components when sending new message
    const [sendMsg, setSendMsg] = useState('')
    const [messageList, setMessageList] = useState<IMessage[]>([]);

    return <context.Provider value={{ sendMsg, setSendMsg, messageList, setMessageList }}>{children}</context.Provider>
}

// 自定義 hook
export const useChatContext = () => {
    return useContext(context);
};