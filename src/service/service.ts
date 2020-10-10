import axios from "axios";
import { POSTCALL_Interface } from "../utility/Interface";

axios.defaults.headers = { "content-type": "application/json" };

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
    return resX;
  } catch (error) {
    return error;
  }
};
