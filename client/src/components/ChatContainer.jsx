import React, { useEffect } from "react";
import { useRef } from "react";
import { formatMessageTime } from "../lib/util";
import assets, { messagesDummyData } from "../assets/assets";

const ChatContainer = ({ selectedUser, setselectedUser }) => {
  console.log(selectedUser);
  const scrollEnd = useRef();
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  if (!selectedUser) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
        <img src={assets.logo_icon} alt="" className="max-w-16" />
        <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic}
          alt=""
          className="w-8 rounded-full"
        />
        <p className="flex text-lg text-white items-center gap-2">
          {selectedUser.fullName}
        </p>
        <img
          onClick={() => setselectedUser(null)}
          src={assets.arrow_icon}
          className="md:hidden max-w-7"
          alt="Back"
        />
        <img
          src={assets.help_icon}
          alt="Help"
          className="max-md:hidden max-w-5"
        />
      </div>

      {/* Chat area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((item, index) => {
          const isSender = item.senderId === "680f50e4f10f3cd28382ecf9";

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "flex-row-reverse justify-end"
              } mb-4`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt="message"
                  className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
                />
              ) : (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                    isSender ? "bg-[#8285B2]/10" : "bg-[#282142] text-white"
                  }`}
                >
                  {item.text}
                </p>
              )}
              <div className="text-center text-xs">
                <img
                  src={
                    item.senderId == "680f50e4f10f3cd28382ecf9"
                      ? assets.avatar_icon
                      : assets.profile_martin
                  }
                  alt=""
                  className="w-7 rounded-e-full"
                />
                <p className="text-gray-500">
                  {formatMessageTime(item.createdAt)}
                </p>
              </div>
              {/* Add message text or other elements here if needed */}
            </div>
          );
        })}
      </div>
      <div ref={scrollEnd}></div>
      {/* Bottom area  */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            type="text"
            className="flex-1 text-sm border-none  p-3 rounded-lg outline-none text-white placeholder-gray-400"
            placeholder="Send a message"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="max-w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img src={assets.send_button} className="w-7 cursor-pointer" alt="sendIcon" />
      </div>
    </div>
  );
};

export default ChatContainer;
