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
        // basicInfo: {}, // Reset basicInfo and addressInfo
        // addressInfo: {},
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
    // case types.UPDATE_USER_START: {
    //   console.log("Before update:", state.users);

    //   const updatedUsers = state.users.map((user) => {
    //     if (user.id === action.payload.id) {
    //       return { ...user, ...action.payload };
    //     } else {
    //       return user;
    //     }
    //   });

    //   return {
    //     ...state,
    //     users: updatedUsers,
    //   };
    // }

    case types.UPDATE_USER_START:
      return {
        ...state,
      //   users: state.users.map((user) =>
      //     user.id === action.payload.id ? { ...user, ...action.payload } : user
      //   ),
      };

    // Inside your reducer

case types.UPDATE_USER_SUCCESS:
  return {
    ...state,
    users: state.users.map((user) =>
      user.id === action.payload.id ? { ...user, ...action.payload.userInfo } : user
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

// import * as types from "./actionTypes";

// const initialState = {
//   loading: false,
//   formData: [],
//   basicInfo: {
//     name: "",
//     email: "",
//     phone: "",
//   },
//   addressInfo: {
//     city: "",
//     state: "",
//     country: "",
//   },
//   error: null,
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.LOAD_USERS_START:
//       return { ...state };
//     case types.LOAD_ADDRESS_START:
//       return { ...state };
//     case types.LOAD_USERS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         formValues: action.payload,
//       };

//     case types.CREATE_USER_START:
//       const newUser = action.payload; // New user object to be added

//       return {
//         ...state,
//         loading: false,
//         formValues: [...state.formValues, newUser], // Add the new user to the formValues array
//       };

//     case types.CREATE_ADDRESS_START:
//       const newAddress = action.payload;

//       const updatedFormValuesWithAddress = Array.isArray(state.formValues)
//         ? state.formValues.map((user) => {
//             if (user && user.id && user.id === newAddress.userId) {
//               return {
//                 ...user,
//                 address: {
//                   ...user.address,
//                   ...newAddress,
//                 },
//               };
//             }
//             return user;
//           })
//         : [];

//       return {
//         ...state,
//         loading: false,
//         formValues: updatedFormValuesWithAddress,
//       };

//     // case types.CREATE_USER_START:
//     //   console.log("CREATE_USER_START :", action);
//     //   console.log("state.formValues", state.formValues);
//     //   const updatedFormValues = [action.payload];
//     //   console.log("updatedFormValues", updatedFormValues);

//     //   return {
//     //     ...state,
//     //     loading: false,
//     //     formValues: updatedFormValues,
//     //   };

//     // case types.CREATE_ADDRESS_START:
//     //   const address = action.payload;
//     //   console.log("addressin reducer", address);
//     //   console.log("actionPayload", action.payload);
//     //   const addUsers = Array.isArray(state.formValues)
//     //     ? state.formValues.map((user) => {
//     //         console.log("inside if condition", user);
//     //         return {
//     //           ...user,
//     //           ...address,
//     //         };
//     //       })
//     //     : [];

//     //   return {
//     //     ...state,
//     //     loading: false,
//     //     formValues: addUsers,
//     //   };

//     case types.UPDATE_USER_START:
//       const updatedUser = action.payload;
//       const updatedFormValue = state.formValues?.map((user) => {
//         if (updatedUser.id && user.id === updatedUser.id) {
//           return {
//             ...user,
//             ...updatedUser.formData, // Merge only formData properties
//           };
//         }
//         return user;
//       });

//       return {
//         ...state,
//         loading: false,
//         formValues: updatedFormValue,
//       };

//     case types.UPDATE_ADDRESS_START:
//       const updatedAddress = action.payload;
//       console.log("updatedAddress in reducer : ", updatedAddress);
//       console.log("actionPayload", action.payload);
//       const updatedValues = Array.isArray(state.formValues)
//         ? state.formValues.map((user) => {
//             if (user.id === updatedAddress.userId) {
//               console.log(user);
//               return {
//                 ...user,
//                 ...updatedAddress,
//               };
//             }
//             return user;
//           })
//         : [];

//       return {
//         ...state,
//         loading: false,
//         formValues: updatedValues,
//       };

//     // case types.UPDATE_USER_START:
//     //   const updatedUser = action.payload;
//     //   console.log("updatedUser : ", updatedUser);
//     //   console.log("actionPayload", action.payload);
//     //   return {
//     //     // ...state,
//     //     loading: false,
//     //     formValues: state.formValues.map((user) => {
//     //       if (user.id === updatedUser.id) {
//     //         return {
//     //           updatedUser: {
//     //             ...user,
//     //           ...updatedUser,
//     //           }
//     //         };
//     //       }
//     //       return user;
//     //     }),
//     //   };

//     // case types.UPDATE_ADDRESS_START:
//     //   const updatedAddress = [action.payload];
//     //   console.log("updatedAddress in reducer : ", updatedAddress);
//     //   console.log("actionPayload", action.payload);
//     //   return {
//     //     ...state,
//     //     loading: false,
//     //     formValues: state.formValues.map((user) => {
//     //       if (user.id === updatedAddress.id) {
//     //         console.log(user);
//     //         return {
//     //           ...user,
//     //           ...updatedAddress,
//     //         };
//     //       }
//     //       return user;
//     //     }),
//     //   };

//     case types.DELETE_USER_START:
//       return {
//         ...state,
//         loading: true,
//       };

//     case types.CREATE_USER_SUCCESS:
//     case types.UPDATE_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//       };
//     case types.DELETE_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         formValues: state.formValues.filter(
//           (item) => item.id !== action.payload
//         ),
//       };
//     case types.LOAD_USERS_ERROR:
//     case types.CREATE_USER_ERROR:
//     case types.DELETE_USER_ERROR:
//     case types.UPDATE_USER_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     // case types.SUBMIT_BASIC_INFO:
//     //   return {
//     //     ...state,
//     //     ...action.payload,
//     //   };
//     // case types.SUBMIT_ADDRESS_INFO:
//     //   return {
//     //     ...state,
//     //     ...action.payload,
//     // };

//     case types.SUBMIT_BASIC_INFO:
//       return {
//         ...state,
//         basicInfo: {
//           ...state.basicInfo,
//           ...action.payload,
//         },
//       };
//     case types.SUBMIT_ADDRESS_INFO:
//       return {
//         ...state,
//         addressInfo: {
//           ...state.addressInfo,
//           ...action.payload,
//         },
//       };

//       case 'ADD_BASIC_INFO':
//         return {
//           ...state,
//           formValues: [...state.formValues, { basicInfo: action.payload }],
//         };
//       case 'MERGE_BASIC_INFO':
//         return {
//           ...state,
//           formValues: state.formValues.map((item) => ({
//             ...item,
//             ...action.payload,
//           })),
//         };

//     case types.STORE_FORM_DATA:
//       return {
//         ...state,
//         formValues: [...state.formValues, action.payload],
//       };
//     case types.STORE_COMBINED_FORM_VALUES:
//       return {
//         ...state,
//         formValues: [...state.formValues, action.payload],
//       };
//     case types.SUBMIT_COMBINED_FORM:
//       const { basicInfo, addressInfo } = action.payload;
//       const combinedFormData = {
//         basicInfo,
//         addressInfo,
//       };
//       return {
//         ...state,
//         formValues: [...state.formValues, combinedFormData],
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;
