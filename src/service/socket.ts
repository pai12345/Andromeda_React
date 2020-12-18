import { io, Socket } from "socket.io-client";
import generateFunctions from "../utility/Functions";

/**
 * Function - Customer Care
 * @description
 * Function having details for Socket Namespace - Customer Care.
 */
const CustomerCare = () => {
  try {
    const GeneratSocketURL = generateFunctions().GeneratSocketURL(
      "CustomerCare"
    );
    const socket = io(GeneratSocketURL);

    socket.on("connect", () => {
      socket.emit(
        "JoinRoom",
        { user: "", message: "join room" },
        (roomid: string) => {
          const decrypt_key = generateFunctions().Decrypt_Room(roomid);
          console.log(`Room joined:${decrypt_key}`);
        }
      );
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Function - Emergency
 * @description
 * Function having details for Socket Namespace - Emergency.
 */
const Emergency = () => {
  try {
    const GeneratSocketURL = generateFunctions().GeneratSocketURL("Emergency");
    const socket = io(GeneratSocketURL);

    socket.on("connect", (data_test: Socket) => {
      console.log(data_test);
      socket.on("userjoined", (message: Socket) => {
        console.log(message);
      });

      socket.emit("chatmessage", { payload: ["a", "b"] });
    });
  } catch (error) {
    throw new Error(error);
  }
};

const generatesocket = () => {
  return {
    CustomerCare: CustomerCare,
    Emergency: Emergency,
  };
};

export default generatesocket;
