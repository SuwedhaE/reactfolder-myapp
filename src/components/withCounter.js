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
        // Assuming combined form submission here
        dispatch(submitCombinedForm(formData)); // Dispatch the combined form action
      }

      console.log("handleSubmit formData:", formData); // Use console.log for logging
    };

    return <WrappedComponent onSubmit={handleSubmit} {...props} />;
  };

  return WithCounter;
};

export default withCounter;

