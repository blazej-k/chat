import { SocketContext } from "../context/SocketContext";
import { useContext } from 'react';
import { ColorContext } from "../context/ColorContext";

const useSocket = () => useContext(SocketContext)
const useColor = () => useContext(ColorContext)

export { useSocket, useColor }