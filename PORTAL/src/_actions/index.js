import {
  FETCH_DEVICE,
  FETCH_LOG,
  FETCH_DATA,
  SELECT_DEVICES,
  SEND_COM
} from "./types";
import openSocket from "socket.io-client";
import axios from "axios";
const socket = openSocket(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"]
});

export const fetchDeviceAction = (speak, listen) => {
  return async dispatch => {
    //socket.on("connect", () => {
    socket.emit(speak, "device-fetching-test");
    socket.on(listen, data => {
      console.log(data.devices);
      dispatch({
        type: FETCH_DEVICE,
        payload: data.devices
      });
    });
    //});
  };
};
export const fetchLogAction = (speak, listen) => {
  return async dispatch => {
    //socket.on("connect", () => {
    socket.emit(speak, "log-fetching-test");
    socket.on(listen, data => {
      console.log(data.logs);
      dispatch({
        type: FETCH_LOG,
        payload: data.logs
      });
    });
    //});
  };
};

export const fetchDataAction = listen => {
  return async dispatch => {
    //socket.on("connect", () => {
    socket.on(listen, data => {
      data = JSON.parse(data);
      console.log(data);
      dispatch({
        type: FETCH_DATA,
        payload: data.data
      });
    });
    //});
  };
};
const testURL = "https://jsonplaceholder.typicode.com/todos/1";
// export const sendCommand = (speak, listen, command) => {
//   return async dispatch => {
//     socket.emit(speak, command);
//     socket.on(listen, data => {
//       console.log(data);
//       dispatch({
//         type: SEND_COM
//       });
//     });
//   };
// };
export const testAction = wordList => {
  return async dispatch => {
    const response = await axios.get(`${testURL}`);
    const result = response.data.title + wordList.join(" ");
    dispatch({ type: SEND_COM, payload: result });
  };
};

export const selectDevices = deviceList => {
  return {
    type: SELECT_DEVICES,
    payload: deviceList
  };
};
