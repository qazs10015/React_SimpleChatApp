
type Props = {
    currentAvatar?: string,
    avatarBlob: string,
    pickAvatar?: (avatarBlob: string) => void
}

function Avatar(props: Props) {
    return (
        <img className={`w-[120px] h-[120px] rounded-full `} src={`data:image/svg+xml;base64,${btoa(props.avatarBlob)}`} onClick={() => props.pickAvatar && props.pickAvatar(props.avatarBlob)}></img>
    )
}

export default Avatar