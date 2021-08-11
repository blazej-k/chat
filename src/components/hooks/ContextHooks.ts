import { SocketContext } from "../context/socketContext/SocketContext";
import { useContext } from 'react';
import { ColorContext } from "../context/colorContext/ColorContext";
import { ChatViewContext } from "../context/chatViewContext/ChatViewContext";

const useSocket = () => useContext(SocketContext)
const useColor = () => useContext(ColorContext)
const useShowChatView = () => useContext(ChatViewContext)

export { useSocket, useColor, useShowChatView }