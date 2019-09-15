import { combineReducers } from "redux";
import {
  FETCH_LOG,
  FETCH_DEVICE,
  FETCH_DATA,
  SELECT_DEVICE,
  SEND_COM
} from "../_actions/types";

const deviceReducer = (
  state = {
    deviceList: [],
    active: 0,
    inactive: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_DEVICE:
      return {
        deviceList: action.payload === undefined ? [] : action.payload,
        active:
          action.payload === undefined
            ? []
            : action.payload.filter(device => {
                return device.status === "connected";
              }).length,
        inactive:
          action.payload === undefined
            ? []
            : action.payload.filter(device => {
                return device.status === "disconnected";
              }).length
      };
    default:
      return state;
  }
};
const logReducer = (
  state = {
    logList: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_LOG:
      return {
        logList: action.payload === undefined ? [] : action.payload.reverse()
      };
    default:
      return state;
  }
};
const dataReducer = (
  state = {
    dataList: [],
    listLen: 0,
    predictionList: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        dataList: [action.payload, ...state.dataList],
        listLen: state.dataList.length,
        predictionList: state.dataList.map(data => {
          return data.prediction;
        })
      };
    default:
      return state;
  }
};
const deviceSelectReducer = (state = { selectedDevice: {} }, action) => {
  switch (action.type) {
    case SELECT_DEVICE:
      return {
        selectedDevice: action.payload
      };
    default:
      return state;
  }
};
export default combineReducers({
  devices: deviceReducer,
  logs: logReducer,
  data: dataReducer,
  selectedDevice: deviceSelectReducer
});
