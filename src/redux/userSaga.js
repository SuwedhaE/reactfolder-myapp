import * as types from "./actionTypes";
import { loadUsersSuccess, loadUsersError, createUserSuccess, createUserError, deleteUserSuccess, deleteUserError, updateUserSuccess, updateUserError, storeFormData, submitAddressInfo, storeCombinedFormValues, submitCombinedForm } from "./action";
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

// function* onLoadAddressStartAsync({ payload }) {
//     try{
//         const response = yield call(loadUsersApi, payload);
//         if(response.status === 200) {
//             yield delay(500);
//             yield put(loadUsersSuccess(response.data));
//         }
//     } catch(error) {
//         yield put(loadUsersError(error.response.data));
//     }
// }

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

function* onUpdateUserStartAsync({payload}) {
    try{
        console.log('Saga: Handling updateUserStartAsync with payload:', payload);
        if(payload && payload.id) {
            const { id, formValue } = payload;
            const response = yield call(updateUserApi, id, formValue);
            if(response.status === 200){
                yield put(updateUserSuccess());
            }
        } else {
            // Handle the case where payload or payload.id is undefined
            // You can log an error or dispatch an action to handle this scenario
        }
    } catch (error) {
        yield put(updateUserError(error.response.data));
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

// function* onLoadAddress() {
//     yield takeEvery(types.LOAD_USERS_START, onLoadAddressStartAsync);
// }

function* onCreateUser() {
    yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onCreateAddress() {
    yield takeLatest(types.CREATE_ADDRESS_START, onCreateUserStartAsync);
}

function* onUpdateUser() {
    yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

function* onUpdateAddress() {
    yield takeLatest(types.UPDATE_ADDRESS_START, onUpdateUserStartAsync);
}

function* onSubmitBasicInfo(action) {
    try {
      const { basicInfo } = action.payload || {};
      console.log("onSubmitBasicInfo: ", basicInfo); // Log for visibility
    } catch (error) {
      // Implement error handling here
    }
  }
  
  function* onSubmitAddressInfo(action) {
    try {
      const { addressInfo } = action.payload || {};
      console.log("onSubmitAddressInfo: ", addressInfo); // Log for visibility
    } catch (error) {
      // Implement error handling here
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
    } catch (error) {
      // Handle error if needed
    }
  }

    // const { formData } = action.payload;
    // yield put(storeFormData(formData));
    // // yield takeLatest({type: 'SUBMIT_ADDRESS_INFO', payload: action.payload})

// function* onCombinedFormSubmission(action){
//     try {
//         const { basicInfo, addressInfo } = action.payload || {};
//         const combinedFormData = {
//             basicInfo,
//             addressInfo,
//         };
//         yield put(storeCombinedFormValues(combinedFormData));
//     } catch (error) {
//         // Handle error if needed
//     }
// }

function* watchFormSubmissions() {
    yield takeLatest(types.SUBMIT_BASIC_INFO, onSubmitBasicInfo);
    yield takeLatest(types.SUBMIT_ADDRESS_INFO, onSubmitAddressInfo);
    yield takeLatest(types.SUBMIT_COMBINED_FORM, onSubmitCombinedForm);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(onCreateAddress), fork(onDeleteUser), fork(onUpdateUser), fork(onUpdateAddress), fork(onSubmitBasicInfo), fork(submitAddressInfo), fork(watchFormSubmissions)];

export default function *rootSaga(){
    yield all([...userSagas ]);
}