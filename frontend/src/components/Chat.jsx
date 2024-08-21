/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";

const Chat = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    return (
        <div className="flex-1 m-10 mockup-window bg-base-300 border">
            <div className="bg-base-200 px-8 py-16">
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <Img
                        url={
                            authUser.profileImg || "https://res.cloudinary.com/dyfmhplwz/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1723910689/blank-profile-2_p1imjt.png"
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
                                "https://res.cloudinary.com/dyfmhplwz/image/upload/v1724002030/cd5b5058-8a1e-47be-99f4-b47abac20cc3_jtgjq7.jpg"
                            }
                        />
                    </div>
                </div>
                <Bubble time={getCurrentTime()} content={"🙄"} name={"Muhammad"} />
            </div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Img
                            url={
                                "https://res.cloudinary.com/dyfmhplwz/image/upload/v1724002030/cd5b5058-8a1e-47be-99f4-b47abac20cc3_jtgjq7.jpg"
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
            <div className="chat-footer opacity-50">{name === 'You' ? `Seen at ${time}`  : undefined}</div>
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
