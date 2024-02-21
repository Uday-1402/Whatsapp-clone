import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment, ImAttachments } from "react-icons/im";
import { MdSend } from "react-icons/md";
import axios from "axios";

function MessageBar() {
  const [message, setMessage] = useState("");
  const [{ userInfo, currentChatUser,socket }, dispatch] = useStateProvider();
  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser.id,
        from: userInfo?.id,
        message,
      });
      socket.current.emit("send-msg",{
        to: currentChatUser.id,
        from: userInfo?.id,
        message:data.message,
      })
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
        <>
          <div className="flex gap-6">
            <BsEmojiSmile
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Emoji"
            />
            <ImAttachment
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Attach Files"
            />
          </div>
          <div className="w-full rounded-lg h-10 flex items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className="flex w-10 items-center justify-center">
            <button onClick={sendMessage}>
              <MdSend
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Send Message"
              />
              {/* <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl" title = "Record Audio"/> */}
            </button>
          </div>
        </>
      </div>
    </>
  );
}

export default MessageBar;
