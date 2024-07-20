import React from 'react'
import { IUser } from '../models/user.model'
import Avatar from './Avatar'

function UserInfo({ isAvatarImageSet, avatarImage, userName }: Omit<IUser, '_id' | 'email'>) {
    return <>
        <div className='flex justify-start items-center gap-2 h-[8vh]'>
            {isAvatarImageSet && <Avatar width={70} avatarBlob={avatarImage}></Avatar>}
            <div> {userName}</div >
        </div>
    </>
}

export default React.memo(UserInfo)