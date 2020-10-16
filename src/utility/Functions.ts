import {
  Validate_LoginPageDetails_interface,
  Error_Customer_enum,
  Appbar_useReducer_Interface,
  EnumLoginPage_LoginStats,
} from "./Interface";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";

/**
 * Function - Validate Data
 * @description
 * Function to Validate Data
 * @params data: Input data to be validated
 * @params type: Type of Validation
 * @returns true | false
 */
const Validate_Data = (data: string, type: string) => {
  switch (type) {
    case Error_Customer_enum.isCustomer_Email:
      return isEmail(data);
    case Error_Customer_enum.isCustomer_Empty:
      return isEmpty(data);
    case Error_Customer_enum.isCustomer_Length:
      return isLength(data, { min: 4 });
    default:
      throw new Error(Error_Customer_enum.isCustomer_UnkowntypeforValidation);
  }
};

/**
 * Function - Validate Customer Details
 * @description
 * Function to Validate Customer Details
 * @params data: Input data to be validated
 * @returns Validation Status
 */
const Validate_LoginPageDetails = (
  data: Validate_LoginPageDetails_interface
) => {
  const username = data.User ?? Error_Customer_enum.Customer_UsernameInvalid;
  const password =
    data.Password ?? Error_Customer_enum.Customer_PasswordInvalid;
  const result = Object.create(null);

  switch (username) {
    case Error_Customer_enum.Customer_UsernameInvalid:
      result.username = Error_Customer_enum.Customer_UsernameInvalid;
      break;
    default:
      if (Validate_Data(username, Error_Customer_enum.isCustomer_Empty)) {
        result.username = Error_Customer_enum.Customer_UsernameEmpty;
        break;
      } else if (
        Validate_Data(username, Error_Customer_enum.isCustomer_Email) === false
      ) {
        result.username = Error_Customer_enum.Customer_InvalidEmailAddress;
        break;
      } else {
        result.username = Error_Customer_enum.Customer_Valid;
        break;
      }
  }

  switch (password) {
    case Error_Customer_enum.Customer_PasswordInvalid:
      result.password = Error_Customer_enum.Customer_PasswordInvalid;
      break;
    default:
      if (Validate_Data(password, Error_Customer_enum.isCustomer_Empty)) {
        result.password = Error_Customer_enum.Customer_PasswordEmpty;
        break;
      } else if (
        Validate_Data(password, Error_Customer_enum.isCustomer_Length) === false
      ) {
        result.password = Error_Customer_enum.Customer_PasswordLength;
        break;
      } else {
        result.password = Error_Customer_enum.Customer_Valid;
        break;
      }
  }
  return result;
};

/**
 * AppBar - Use Reducer
 * @param state
 * @param action
 */
const AppBar_ReducerFunction = (
  state: any,
  action: Appbar_useReducer_Interface
) => {
  const newState = { ...state };
  switch (action.type) {
    case "SelectionType":
      newState.Shellbar.productTitle = action.selection;
      switch (action.selection) {
        case "Ecommerce":
          newState.search = true;
          break;
        default:
          break;
      }
      return newState;
    case "Drawer":
      newState.open = action.open;
      newState.search = false;
      return newState;
    case "AnchroEl":
      newState.anchorEl = action.open;
      newState.search = false;
      return newState;
    case "Logout":
      newState.anchorEl = action.open;
      newState.Shellbar.productTitle = action.selection;
      newState.search = false;
      return newState;
    default:
      return newState;
  }
};

/**
 * Function - Authentication
 * @description
 * Function to validate Authentication
 */
const Authenticate_User = (type: string) => {
  switch (type) {
    case "true":
      return true;
    default:
      return false;
  }
};

//========Generic==========//
/**
 * Function for Nullish Coalescing
 * @description
 * Function to check if value is null | undefined
 */
const NullishCoalesce = (data: any) => {
  const validate = data ?? EnumLoginPage_LoginStats;
  return validate;
};

/**
 * Function - Generate
 * @description
 * Function to generate other functions
 */
const generateFunctions = () => {
  return {
    Validate_Data: Validate_Data,
    Validate_LoginPageDetails: Validate_LoginPageDetails,
    AppBar_ReducerFunction: AppBar_ReducerFunction,
    Authenticate_User: Authenticate_User,
    NullishCoalesce: NullishCoalesce,
  };
};

export default generateFunctions;
