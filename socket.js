import { io } from "socket.io-client";
import { BASE_URL } from "./src/apis";

// "undefined" means the URL will be computed from the `window.location` object
const URL = BASE_URL;

export const socket = io(URL);
