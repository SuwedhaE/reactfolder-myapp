import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserStart } from "../redux/action";
import { useNavigate, useParams } from "react-router-dom";


const EditInfo = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams(); 
    const users = useSelector((state) => state.data.users);
    const navigate = useNavigate();
    const [editedUser, setEditedUser] = useState({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "",
    });
  
    useEffect(() => {
      const user = users.find((user) => user.id === parseInt(id));
      if (user) {
        setEditedUser({
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          city: user.city || "",
          state: user.state || "",
          country: user.country || "",
        });
      }
    }, [users, id]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
      // debugger
      console.log(id.editedUser);
      dispatch(updateUserStart(id, editedUser));
      // debugger
      console.log(id.editedUser);
      // debugger
      alert("User Updated Successfully!!!")
      navigate("/");
    };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center fs-3">
              Update User Details
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Enter Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    required
                    value={editedUser.fullName}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={editedUser.email || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    required
                    value={editedUser.phone || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    required
                    value={editedUser.city || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    required
                    value={editedUser.state || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    required
                    value={editedUser.country || ""}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary">
                    Update User
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

export default EditInfo;
