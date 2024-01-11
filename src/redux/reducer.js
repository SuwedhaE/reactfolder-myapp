import * as types from "./actionTypes";

const initialState = {
  loading: false,
  users: [],
  basicInfo: {
    fullName: "",
    email: "",
    phone: "",
  },
  addressInfo: {
    city: "",
    state: "",
    country: "",
  },
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case types.LOAD_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CREATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };
    case types.CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.UPDATE_USER_START:
      return {
        ...state,
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.userInfo }
            : user
        ),
      };

    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case types.DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.SUBMIT_BASIC_INFO:
      return {
        ...state,
        basicInfo: action.payload,
      };
    case types.SUBMIT_ADDRESS_INFO:
      return {
        ...state,
        addressInfo: action.payload,
      };

    case types.SUBMIT_COMBINED_FORM:
      const { basicInfo, addressInfo } = action.payload;
      const combinedFormData = {
        fullName: basicInfo.fullName,
        email: basicInfo.email,
        phone: basicInfo.phone,
        city: addressInfo.city,
        state: addressInfo.state,
        country: addressInfo.country,
      };
      return {
        ...state,
        users: [...state.users, combinedFormData],
      };
    default:
      return state;
  }
};

export default userReducer;
