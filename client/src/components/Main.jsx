import React, { useEffect, useState,useRef } from "react";
import { useRouter } from "next/router";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import {firebaseAuth}from "@/utils/FirebaseConfig";
import axios from "axios";
import Chat from '@/components/Chat/Chat';
import { HOST } from "@/utils/ApiRoutes";
import { io } from "socket.io-client";

function Main() {
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [{ userInfo,currentChatUser }, dispatch] = useStateProvider();
  const [socketEvent,setSocketEvent] = useState(false);
  const socket = useRef();
  const router = useRouter();

  useEffect(() => {
    if (redirectLogin) {
      router.push("/login");
    }
  }, [redirectLogin]);

  const emptyObj = {};
  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });

      if (!data.status) router.push("/login");

      const {
        id,
        email,
        name,
        profilePicture: profileImage,
        status,
      } = data.data;
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: {
          id,
          name,
          email,
          profileImage,
          status,
        },
      });
    }
  });

  useEffect(() => {
    if(userInfo){
      socket.current = io(HOST);
      socket.current.emit("add-user",userInfo.id);
      dispatch({type:reducerCases.SET_SOCKET,socket});
    }
  }, [userInfo]);

  useEffect(()=>{
    if(socket.current && !socketEvent){
      socket.current.on("msg-recieve",(data)=>{
        dispatch({
          type:reducerCases.ADD_MESSAGE,
          newMessage:{
            ...data.message,

          }
        })
      })
      setSocketEvent(true);
    }
  },[socket.current]);
  

  useEffect(() => {
    const getMessages = async()=>{
      const {data:{messages}} = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`);

      dispatch({type:reducerCases.SET_MESSAGES,messages});
    };

    if(currentChatUser?.id){
      getMessages();
    }
  }, [currentChatUser]);
  

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {
          currentChatUser?<Chat/>:<Empty/>
        }
      </div>
    </>
  );
}

export default Main;
