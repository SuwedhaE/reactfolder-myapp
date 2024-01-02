import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { submitBasicInfo } from "../redux/action";

const BasicInfo = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { users } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      console.log(singleUser);
      setFullName(singleUser?.fullName || "");
      setEmail(singleUser?.email || "");
      setPhone(singleUser?.phone || "");
    } else {
      setEditMode(false);
      setFullName('');
      setEmail('');
      setPhone('');
    }
  }, [id, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const basicInfo = { fullName, email, phone };
    console.log(basicInfo);
    if(basicInfo){
      if(!editMode){
        navigate(`/addressinfo/add/${encodeURIComponent(fullName)}/${encodeURIComponent(email)}/${encodeURIComponent(phone)}`);
      }
      else {
        setEditMode(false);
        navigate(`/addressinfo/update/${encodeURIComponent(id)}/${encodeURIComponent(fullName)}/${encodeURIComponent(email)}/${encodeURIComponent(phone)}`); 
      }
    }
    dispatch(submitBasicInfo({basicInfo}));
    console.log(basicInfo);
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center fs-3">
              {!editMode ? "Add User Data" : "Update User Details"}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Enter Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                    value={fullName || ""}
                    onChange={(e) => setFullName(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Enter Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    required
                    value={phone || ""}
                    onChange={(e) => setPhone(e.target.value)}
                  ></input>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary">
                    {!editMode ? "Add" : "Update"}
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

// Connect to Redux store 
const mapStateToProps = (state) => ({
  fullName: state.data.basicInfo.fullName, 
  email: state.data.basicInfo.email,
  phone: state.data.basicInfo.phone,
});

export default connect(mapStateToProps)(BasicInfo);