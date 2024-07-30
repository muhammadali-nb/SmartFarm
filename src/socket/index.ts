import { io } from "socket.io-client";

const options = {
    "force new connection": true,
    reconnectionAttempts: 30, // avoid having user reconnect manually in order to prevent dead clients after a server restart
    timeout: 10000, // before connect_error and connect_timeout are emitted.
    transports: ["websocket"],
};

const socket = io("http://localhost:5500/", options);

export default socket;
