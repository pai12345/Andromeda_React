import { Dispatch } from "react";
import { EnumAppBar } from "./Interface";
import dotenv from "dotenv";
dotenv.config();

//=============================Enum=====================================//
/**
 * Enumeration for API Status
 * @description
 * Enumeration having API Status details
 */
export enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
  Unavailable = 503,
  BADREQUEST = 400,
  SuccessMessage = "Success",
  ErrorMessage = "Error",
  WebServerTitle = "Web Server",
  WebServerBody = "Microservice Web Server",
  PageNotFoundTitlte = "Service Not Found",
  PageNotFoundBody = `404 - Service Not Found`,
  ListeningonPort = "Listening on Port",
}

//============LoginPage============//

//============LoginPage=============//
/**
 * Enumeration for LoginPage
 * @description
 * Enumeration having details for LoginPage
 */
export enum Util_enum {
  NotResponding = "Server did not response with any data",
  title = "Log In",
}

//=============AppBar=============//

//================================State================================//
//=============AppBar============//
/**
 * State - Appbar.
 *
 * @remarks
 * Provides details of immutable states for Appbar.
 *
 */
export const Shellbar_State = {
  productTitle: EnumAppBar.productTitle,
  alt: EnumAppBar.alt,
  src: require("../styles/iconfinder_React.js_logo_1174949.png"),
  MenuBar: [
    {
      Text: EnumAppBar.MenuBar_Text,
    },
    {
      Text: "Settings",
    },
    {
      Text: "Account",
    },
    {
      Text: "Sell",
    },
    {
      Text: "Customer Care",
    },
  ],
};

export const AppBar_List = {
  isAuthenticated: false,
};

//=============Ecommerce============//
/**
 * State - Ecommerce Page
 * @remarks
 * Provides details required for Ecommerce Page.
 */
export const Ecommerce_State = {
  Tab: [
    "Electronics & Appliance",
    "Books",
    "Sports",
    "Fashion",
    "Home & Living",
    "Toys & Collectibles",
    "Health & Essentials",
    "Groceries",
    "Top Offers",
  ],
};

//==============================Interface=================================//

export interface LoginPage_useReduce_action_Interface {
  type: string;
  index?: any;
  data?: string;
}

export interface LoginPage_Authenticationresult_Interface {
  data: {
    data: {
      Customer: {
        status: string;
        data: {
          address: string;
          contactnumber: number;
          customerid: string;
          dateofbirth: string | null;
          email: string;
          name: string;
          title: string | null;
        }[];
      };
    };
  };
}

//=========SignUp Page========//
export interface SignUp_useReduce_action_Interface {
  type: string;
  newState: {
    title: string;
    SignUp: {
      Text: string;
      Link: {
        URL: string;
        Text: string;
      };
    };
    LoginButton: {
      Text: string;
      type: string;
    }[];
    LoginBody: {
      Label: string;
      value: string;
      type: string;
      placeholder: string;
      Combobox?: {
        key: string;
        text: string;
      }[];
    }[];
  };
}

export interface SignUp_Input_Interface {
  target: { value: string };
}

//=============MainPage============//
export interface MainPage_ListItem_Interface {
  data: {
    state: {
      ListData: {
        List1: string[];
      }[];
    };
    dispatch: Dispatch<any>;
  };
}

//================AppBar===================//
export interface Appbar_MenuBar_Interface {
  Text: string;
}

export interface AppBar_Props_Interface {
  data: boolean;
}

export interface AppBar_HeaderIcon_Interface {
  data: () => void;
}

//=============POSTCALL==============//
export interface POSTCALL_Interface {
  URL: string;
  data: {
    query: string;
    variables?: any;
    operationName?: string;
  };
}

//===============Survey==============//
export interface XgTile_Interface {
  data: {
    state: {
      link: string;
      tiles: {
        header: string;
        text: string;
        path: string;
      }[];
    };
  };
}

//=============Endpoint==============//
interface Endpoint_interface {
  [Login: string]: string | undefined;
}

//================================Function================================//
// //=============AppBar===============//
// export const AppBar_ReducerFunction = (
//   state: any,
//   action: Appbar_useReducer_Interface
// ) => {
//   const newState = { ...state };
//   switch (action.type) {
//     case "SelectionType":
//       newState.Shellbar.productTitle = action.selection;
//       switch (action.selection) {
//         case "Ecommerce":
//           newState.search = true;
//           break;
//         default:
//           break;
//       }
//       return newState;
//     case "Drawer":
//       newState.open = action.open;
//       newState.search = false;
//       return newState;
//     case "AnchroEl":
//       newState.anchorEl = action.open;
//       newState.search = false;
//       return newState;
//     case "Logout":
//       newState.anchorEl = action.open;
//       newState.Shellbar.productTitle = action.selection;
//       newState.search = false;
//       return newState;
//     default:
//       throw new Error("Unkown Path for AppBar useReducer");
//   }
// };

//=============SignUp============//
/**
 * Function - SignUp Page useReducer
 * @description
 * Function for useReducer in SignUp Page
 * @param state Current State of Component
 * @param action Type of Action to be Performed
 * @return Updated State
 */
export const SignUp_ReducerFunction = (
  _state: any,
  action: SignUp_useReduce_action_Interface
) => {
  switch (action.type) {
    case "SignUp":
      return action.newState;
    case "ResetState":
      return action.newState;
    default:
      throw new Error("Unkown Path for SignUp useReducer");
  }
};

//========Generic==========//
/**
 * Function for Nullish Coalescing
 * @description
 * Function to check if value is null | undefined
 */
export const NullishCoalesce = (data: any) => {
  const validate = data ?? Util_enum;
  return validate;
};

//==============================Objects====================================//

/**
 * API Endpoints
 * @description
 * Enumeration having API Endpoint details
 */
export const Endpoint: Endpoint_interface = {
  Login: process.env.REACT_APP_API,
};
