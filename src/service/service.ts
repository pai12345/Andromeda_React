import axios from "axios";
import { POSTCALL_Interface } from "../utility/Interface";

axios.defaults.headers = { "content-type": "application/json" };
axios.defaults.withCredentials = true;

/**
 * API - POST
 * @description
 * API for POST Service
 */
export const POSTCALL = async (payload: POSTCALL_Interface) => {
  try {
    const { URL, data } = payload;
    const reqX = axios.post(`http://localhost:8000/api/${URL}`, data);
    const [resX] = await Promise.all([reqX]);
    return {status: "success", message: resX};
  } catch (error) {
    return {status:"error", message: error};
  }
};
