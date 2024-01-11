import * as types from "./actionTypes";
import { loadUsersSuccess, loadUsersError, createUserSuccess, createUserError, deleteUserSuccess, deleteUserError, updateUserError, submitAddressInfo, submitCombinedForm } from "./action";
import { loadUsersApi, createUserApi, deleteUserApi, updateUserApi } from "./api";

import { takeEvery, fork, all, call, put, delay, takeLatest, take } from "redux-saga/effects";

function* onLoadUsersStartAsync() {
    try{
        const response = yield call(loadUsersApi);
        if(response.status === 200) {
            yield delay(500);
            yield put(loadUsersSuccess(response.data));
        }
    } catch(error) {
        yield put(loadUsersError(error.response.data));
    }
}

function* onCreateUserStartAsync({payload}) {
    try{
        const response = yield call(createUserApi, payload);
        if(response.status === 200) {
            yield put(createUserSuccess(response.data));
        }
    } catch(error) {
        yield put(createUserError(error.response.data));
    }
}

function* onDeleteUserStartAsync(userId){
    try{
        const response = yield call(deleteUserApi, userId);
        if(response.status === 200) {
            yield delay(500);
            yield put(deleteUserSuccess(userId));
        }
    } catch(error) {
        yield put(deleteUserError(error.response.data));
    }
}

function* onUpdateUserStartAsync(action) {
    try {
      const { id, editedUser } = action.payload;
      yield call(updateUserApi, id, editedUser);
      yield put({ type: 'UPDATE_USER_SUCCESS', payload: { editedUser } });
    } catch (error) {
      console.error("Error in onUpdateUserStartAsync:", error);
      yield put(updateUserError("Failed to update user"));
    }
  }
 
function* onDeleteUser(){
    while(true) {
        const {payload : userId} = yield take(types.DELETE_USER_START);
        yield call(onDeleteUserStartAsync, userId)
    }
}

function* onLoadUsers() {
    yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
    yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onCreateAddress() {
    yield takeLatest(types.CREATE_ADDRESS_START, onCreateUserStartAsync);
}

function* onUpdateUser() {
    yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

function* onSubmitBasicInfo(action) {
    try {
      const { basicInfo } = action.payload || {};
      console.log("onSubmitBasicInfo: ", basicInfo); 
    } catch (error) {
      yield put(createUserError("Failed to update User"));
    }
  }
  
  function* onSubmitAddressInfo(action) {
    try {
        const { addressInfo } = action.payload || {};
        console.log("onSubmitAddressInfo: ", addressInfo);
    } catch (error) {
      yield put(updateUserError("Failed to update address")); // Example error action
    }
  }
  

  function* onSubmitCombinedForm(action) {
    try {
      const { basicInfo, addressInfo } = action.payload;
      const combinedFormData = {
        basicInfo,
        addressInfo,
      };
      yield put(submitCombinedForm(combinedFormData));
    } catch (error) {}
  }

function* watchFormSubmissions() {
    yield takeLatest(types.SUBMIT_BASIC_INFO, onSubmitBasicInfo);
    yield takeLatest(types.SUBMIT_ADDRESS_INFO, onSubmitAddressInfo);
    yield takeLatest(types.SUBMIT_COMBINED_FORM, onSubmitCombinedForm);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(onCreateAddress), fork(onDeleteUser), fork(onUpdateUser), fork(onSubmitBasicInfo), fork(submitAddressInfo), fork(watchFormSubmissions)];

export default function *rootSaga(){
    yield all([...userSagas ]);
}