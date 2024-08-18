const Chat = () => {
    return (
        <div className="flex-1 m-10 mockup-window bg-base-300 border">
            <div className="bg-base-200 px-8 py-16">
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <Img
                        url={
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                    />
                </div>
                <Bubble time={getCurrentTime()} content={"No design skills? 😂"} name={"You"} />
            </div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Img
                            url={
                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                        />
                    </div>
                </div>
                <Bubble time={getCurrentTime()} content={"I'm a backend guy! 🙄"} name={"Muhammad"} />
            </div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Img
                            url={
                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                        />
                    </div>
                </div>
                <Bubble time={getCurrentTime()} content={"Just play the game"} name={"Muhammad"} />
            </div>
            </div>
            
        </div>
    );
};

const Img = ({ url }) => {
    return (
        <div className="w-10 rounded-full">
            <img alt="profile pic" src={url} />
        </div>
    );
};

const Bubble = ({content, time, name}) => {
    return (
        <>
            <div className="chat-header">
                {name}
                <time className="text-xs opacity-50 mx-2">{time}</time>
            </div>
            <div className="chat-bubble">{content}</div>
            <div className="chat-footer opacity-50">{name === 'You' ? 'Delivered' : `Seen at ${time}`}</div>
        </>
    );
};

const getCurrentTime = () => {
    const now = new Date();
  
    // Get hours and minutes
    let hours = now.getHours();
    let minutes = now.getMinutes();
  
    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Format the time as "HH:MM"
    const currentTime = `${hours}:${minutes}`;
  
    return currentTime;
  }

export default Chat;
