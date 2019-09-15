import {
  FETCH_DEVICE,
  FETCH_LOG,
  FETCH_DATA,
  SELECT_DEVICE,
  SEND_COM
} from "./types";
import openSocket from "socket.io-client";
const socket = openSocket(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"]
});

export const fetchDeviceAction = (speak, listen) => {
  return async dispatch => {
    socket.on("connect", () => {
      socket.emit(speak, "device-fetching-test");
      socket.on(listen, data => {
        console.log(data.devices);
        dispatch({
          type: FETCH_DEVICE,
          payload: data.devices
        });
      });
    });
  };
};
export const fetchLogAction = (speak, listen) => {
  return async dispatch => {
    socket.on("connect", () => {
      socket.emit(speak, "log-fetching-test");
      socket.on(listen, data => {
        console.log(data.logs);
        dispatch({
          type: FETCH_LOG,
          payload: data.logs
        });
      });
    });
  };
};

export const fetchDataAction = listen => {
  return async dispatch => {
    socket.on("connect", () => {
      socket.on(listen, data => {
        data = JSON.parse(data);
        console.log(data);
        dispatch({
          type: FETCH_DATA,
          payload: data.data
        });
      });
    });
  };
};
