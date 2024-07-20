import React from 'react'
import { IUser } from '../models/user.model'
import Avatar from './Avatar'

type Props = {
    chatTarget: IUser
}

function ChatTargetInfo({ chatTarget }: Props) {
    return (
        <div className='flex justify-start items-center gap-2 h-[9vh] p-2 bg-blue-900 rounded-tr-lg'>
            {chatTarget.isAvatarImageSet && <Avatar width={70} avatarBlob={chatTarget.avatarImage}></Avatar>}
            <div className='text-white'> {chatTarget.userName}</div >
        </div>
    )
}

export default React.memo(ChatTargetInfo)