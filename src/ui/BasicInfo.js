import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { submitBasicInfo } from "../redux/action";

const BasicInfo = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.data.users);

  const validateForm = () => {
    let isValid = true;

    // Name validation
    if (!/^[A-Za-z ]{3,16}$/.test(fullName)) {
      setFullNameError(
        "Username should be 3-16 characters and should only contain letters and spaces!"
      );
      isValid = false;
    } else {
      // Check if the username already exists
      const isUserNameTaken = users.some((user) => user.fullName === fullName);
      if (isUserNameTaken) {
        setFullNameError(
          " This name is already taken. Please choose a different one."
        );
        isValid = false;
      } else {
        setFullNameError("");
      }
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email address!");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number!");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const basicInfo = { fullName, email, phone };
      console.log(basicInfo);

      navigate(
        `/addressinfo/add/${encodeURIComponent(fullName)}/${encodeURIComponent(
          email
        )}/${encodeURIComponent(phone)}`
      );

      dispatch(submitBasicInfo({ basicInfo }));
      console.log(basicInfo);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center fs-3">Add User Data</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Enter Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      fullNameError ? "is-invalid" : ""
                    }`}
                    name="name"
                    autoComplete="off"
                    required
                    value={fullName || ""}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {fullNameError && (
                    <div className="invalid-feedback">{fullNameError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Enter Email</label>
                  <input
                    type="text"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    name="email"
                    autoComplete="off"
                    required
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <div className="invalid-feedback">{emailError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Enter Phone Number</label>
                  <input
                    type="text"
                    className={`form-control ${phoneError ? "is-invalid" : ""}`}
                    name="phone"
                    autoComplete="off"
                    required
                    value={phone || ""}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {phoneError && (
                    <div className="invalid-feedback">{phoneError}</div>
                  )}
                </div>
                <div className="text-center">
                  <button className="btn btn-primary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullName: state.data.basicInfo.fullName,
  email: state.data.basicInfo.email,
  phone: state.data.basicInfo.phone,
});

export default connect(mapStateToProps)(BasicInfo);
