import * as types from "./actionTypes";

// Load users
export const loadUsersStart = () => ({
  type: types.LOAD_USERS_START,
});

export const loadAddressStart = () => ({
  type: types.LOAD_ADDRESS_START,
});

export const loadUsersSuccess = (formValues) => ({
  type: types.LOAD_USERS_SUCCESS,
  payload: formValues,
});

export const loadUsersError = (error) => ({
  type: types.LOAD_USERS_ERROR,
  payload: error,
});

// Create user
export const createUserStart = (formData) => ({
  type: types.CREATE_USER_START,
  payload: formData,
});

export const createAddressStart = (address) => ({
  type: types.CREATE_ADDRESS_START,
  payload: address,
});

export const createUserSuccess = (userData) => ({
  type: types.CREATE_USER_SUCCESS,
  payload: userData,
});

export const createUserError = (error) => ({
  type: types.CREATE_USER_ERROR,
  payload: error,
});

// Delete user
export const deleteUserStart = (userID) => ({
  type: types.DELETE_USER_START,
  payload: userID,
});

export const deleteUserSuccess = (userID) => ({
  type: types.DELETE_USER_SUCCESS,
  payload: userID,
});

export const deleteUserError = (error) => ({
  type: types.DELETE_USER_ERROR,
  payload: error,
});

// Update address

export const updateUserStart = (id, editedUser) => ({
  type: types.UPDATE_USER_START,
  payload: { id, editedUser },
});

export const updateUserSuccess = (userID) => ({
  type: types.UPDATE_USER_SUCCESS,
});

export const updateUserError = (error) => ({
  type: types.UPDATE_USER_ERROR,
  payload: error,
});

//submitting formvalues

export const submitBasicInfo = (basicInfo) => ({
  type: types.SUBMIT_BASIC_INFO,
  payload: basicInfo,
});

export const submitAddressInfo = (addressInfo) => ({
  type: types.SUBMIT_ADDRESS_INFO,
  payload: addressInfo,
});

export const submitCombinedForm = (basicInfo, addressInfo) => ({
  type: types.SUBMIT_COMBINED_FORM,
  payload: { basicInfo, addressInfo },
});