import { SocketContext } from "../context/socketContext/SocketContext";
import { useContext } from 'react';
import { ColorContext } from "../context/colorContext/ColorContext";
import { ChatViewContext } from "../context/chatViewContext/ChatViewContext";
import { ModalContext } from "../context/modal/Modal";

const useSocket = () => useContext(SocketContext)
const useColor = () => useContext(ColorContext)
const useShowChatView = () => useContext(ChatViewContext)
const useModal = () => useContext(ModalContext)

export { useSocket, useColor, useShowChatView, useModal }