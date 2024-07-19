import React from "react";

type Props = {
    width?: number,
    avatarBlob: string,
    pickAvatar?: (avatarBlob: string) => void
}

function Avatar(props: Props) {
    const width = props?.width || 120;
    console.log(props.width);
    return (
        <>
            <img style={{ width }} className={'rounded-full'} src={`data:image/svg+xml;base64,${btoa(props.avatarBlob)}`} onClick={() => props.pickAvatar && props.pickAvatar(props.avatarBlob)}></img>
        </>
    )
}

export default React.memo(Avatar);