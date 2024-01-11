import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateUserStart } from "../redux/action";
import { useNavigate, useParams } from "react-router-dom";

const EditInfo = () => {
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
    alert("User Updated Successfully!!!");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
          <div className="card">
            <div className="card-header text-center fs-3">
              Update User Details
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Enter Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        required
                        value={editedUser.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Enter Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        required
                        value={editedUser.email || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Enter Phone Number</label>
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        required
                        value={editedUser.phone || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Enter City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        required
                        value={editedUser.city || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Enter State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        required
                        value={editedUser.state || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Enter Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        required
                        value={editedUser.country || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary">Update User</button>
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

export default connect(mapStateToProps)(EditInfo);
