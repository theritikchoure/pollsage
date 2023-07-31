import { io } from "socket.io-client";

const socket = io('', {
    autoConnect: false,
}); // Replace with your server URL

export default socket;