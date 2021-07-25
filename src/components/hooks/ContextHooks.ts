import { SocketContext } from "../context/SocketContext";
import { useContext } from 'react';
import { ColorContext } from "../context/ColorContext";
import { ChatViewContext } from "../context/ChatViewContext";

const useSocket = () => useContext(SocketContext)
const useColor = () => useContext(ColorContext)
const useShowChatView = () => useContext(ChatViewContext)

export { useSocket, useColor, useShowChatView }