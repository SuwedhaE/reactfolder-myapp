import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  createAddressStart,
  updateAddressStart,
  submitAddressInfo,
  updateUserStart,
} from "../redux/action";

const AddressInfo = () => {
  const { id } = useParams();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fullName, email, phone } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && state && country) {
      const addressInfo = { fullName, email, phone, city, state, country };
      const userId = id;
      console.log("AddressInfo: ", addressInfo);
      dispatch(createAddressStart(addressInfo));
      alert("User added Successfully !!!");
      // debugger
      dispatch(submitAddressInfo(addressInfo));
      console.log("ID : ", id);
      // debugger
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center fs-3">
              Add User Data
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Enter City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    required
                    value={city || ""}
                    onChange={(e) => setCity(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    required
                    value={state || ""}
                    onChange={(e) => setState(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    required
                    value={country || ""}
                    onChange={(e) => setCountry(e.target.value)}
                  ></input>
                </div>
                <div className="text-center">
                  <button className="btn btn-success">
                    Submit
                  </button>
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
  users: state.data.users,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSubmitAddressInfo: (addressInfo) =>
    dispatch(submitAddressInfo(addressInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressInfo);