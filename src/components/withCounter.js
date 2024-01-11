import React from 'react';
import { useDispatch } from 'react-redux';
import { submitBasicInfo, submitCombinedForm } from '../redux/action'; // Import submitCombinedForm action

const withCounter = (WrappedComponent) => {
  const WithCounter = (props) => {
    const dispatch = useDispatch();

    const handleSubmit = (formData) => {
      if (formData.type === 'basicInfo') {
        dispatch(submitBasicInfo(formData));
      } else {
        dispatch(submitCombinedForm(formData)); 
      }

      console.log("handleSubmit formData:", formData); 
    };

    return <WrappedComponent onSubmit={handleSubmit} {...props} />;
  };

  return WithCounter;
};

export default withCounter;

