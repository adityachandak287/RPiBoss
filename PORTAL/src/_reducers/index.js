import { combineReducers } from "redux";
import {
  FETCH_LOG,
  FETCH_DEVICE,
  FETCH_DATA,
  SELECT_DEVICES,
  SEND_COM
} from "../_actions/types";

const deviceReducer = (
  state = {
    deviceList: [],
    active: 0,
    inactive: 0,
    sDeviceList: []
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
              }).length,
        sDeviceList: state.sDeviceList
      };
    case SELECT_DEVICES:
      return {
        deviceList: state.deviceList,
        active: state.active,
        inactive: state.inactive,
        sDeviceList: action.payload
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
const commandReducer = (state = { testResult: " " }, action) => {
  switch (action.type) {
    case SEND_COM:
      return {
        testResult: action.payload
      };
    default:
      return state;
  }
};
export default combineReducers({
  devices: deviceReducer,
  logs: logReducer,
  data: dataReducer,
  result: commandReducer
});
