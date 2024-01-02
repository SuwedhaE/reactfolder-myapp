import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { createAddressStart, updateAddressStart, submitAddressInfo, updateUserStart  } from "../redux/action";

const AddressInfo = () => {
  const { id } =useParams();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { users } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fullName, email, phone } = useParams();
  
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      console.log(singleUser);
      setCity(singleUser?.city || ""); // Fetching city from the user object
      setState(singleUser?.state || ""); // Fetching state from the user object
      setCountry(singleUser?.country || ""); // Fetching country from the user object
    } else {
      setEditMode(false);
      setCity('');
      setState('');
      setCountry('');
    }
  }, [id, users]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && state && country){
      const addressInfo = { fullName, email, phone, city, state, country };
      console.log("Before edit loop: ", addressInfo);
      if(!editMode) {
        console.log("Address Component:", addressInfo);
        dispatch(createAddressStart(addressInfo));
        alert("User added Successfully !!!");
      }else {
        setEditMode(false);
        console.log("Update loop: ",addressInfo);
        // debugger
        dispatch(updateUserStart(addressInfo));
        console.log("Updated addressInfo: ",addressInfo);
      }
      // debugger
      dispatch(submitAddressInfo(addressInfo));
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
              {!editMode ? "Add User Data" : "Update User Details"}
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
                    {editMode ? "Update" : "Submit"}
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
  dispatchSubmitAddressInfo: (addressInfo) => dispatch(submitAddressInfo(addressInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressInfo);

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { updateUserStart, submitAddressInfo, createAddressStart, updateAddressStart } from "../redux/action";
// import withCounter from "../components/withCounter";

// const AddressInfo = ({ dispatchSubmitAddressInfo }) => {
//   // const { name, email, phone } = useParams();
//   const userId = id;
//   const location = useLocation();
//   const [editMode, setEditMode] = useState(false);
//   const { formValues } = useSelector((state) => state.data);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Use state for handling form data
//   const [formData, setFormData] = useState({
//     city: '',
//     state: '',
//     country: '',
//   });

//   useEffect(() => {
//     const pathParts = location.pathname.split('/');
//     const action = pathParts[2]; // 'add' or 'update'
//     if (action === 'add') {
//       setEditMode(false);
//       setFormData({
//         city: '',
//         state: '',
//         country: '',
//       });
//     } else if (action === 'update' && formValues && formValues.length) {
//       setEditMode(true);
//       const userId = pathParts[3]; // Extract user ID
//       const singleUser = formValues.find((item) => item.id === Number(userId));
//       if (singleUser) {
//         setFormData({
//           city: singleUser.city || '',
//           state: singleUser.state || '',
//           country: singleUser.country || '',
//         });
//       }
//     }
//   }, [formValues, id, location.pathname]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { city, state, country } = formData;
//     if (city && state && country) {
//       const pathParts = location.pathname.split('/');
//       const action = pathParts[2];
//       const userId = pathParts[3];

//       // const formValues = { ...formData, name, email, phone };

//       let formValues = { city, state, country }; // Initialize with city, state, country

//       if (name && email && phone) {
//         formValues = { ...formValues, name, email, phone }; // Include name, email, phone if available
//       }

//       if (action === 'add' || action === 'update') {
//         console.log("Before if in address info : " , formValues);
//         if (action === 'add') {
//           console.log("Before dispatch : " , formValues);
//           dispatch(createAddressStart(formValues));
//           console.log("After dispatch : " , formValues);
//           alert("User added successfully");
//         } else {
//           console.log("Before dispatch : " , formValues);
//           dispatch(updateAddressStart({ id: userId, formValues }));
//           console.log("After dispatch : " , formValues);
//           alert("Updated successfully");
//         }
//       }

//       dispatchSubmitAddressInfo({ formValues });
//       navigate("/"); // Navigate back to home
//     }
//   };

//   // useEffect(() => {
//   //   const pathParts = window.location.pathname.split('/');
//   //   const action = pathParts[2]; // 'add' or 'update'
//   //   if (action === 'add') {
//   //     // It's an add operation, reset fields
//   //     setEditMode(false);
//   //     setCity('');
//   //     setState('');
//   //     setCountry('');
//   //   } else if (action === 'update') {
//   //     // It's an update operation, fetch user details
//   //     setEditMode(true);
//   //     const userId = pathParts[3]; // Extract user ID
//   //     const singleUser = formValues.find((item) => item.id === Number(userId));
//   //     if (singleUser) {
//   //       setCity(singleUser.city || '');
//   //       setState(singleUser.state || '');
//   //       setCountry(singleUser.country || '');
//   //     }
//   //   }
//   // }, [formValues]);

//   // const handleSubmit = (e) => {

//   //   e.preventDefault();
//   //   if (city && state && country) {
//   //     const formData = { name, email, phone, city, state, country };
//   //     const pathParts = window.location.pathname.split('/');
//   //     const action = pathParts[2];
//   //     const userId = pathParts[3];
//   //     if (action === 'add') {
//   //       console.log(formData);
//   //       dispatch(createAddressStart(formData));
//   //       alert("User added successfully");
//   //     } else if (action === 'update') {
//   //       console.log(formData);
//   //       dispatch(updateAddressStart({ id: userId, ...formData }));
//   //       alert("Updated successfully");
//   //     }
//   //     submitAddressInfo(formData);
//   //     navigate("/"); // Navigate back to home
//   //   }
//   // };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//           <div className="card">
//             <div className="card-header text-center fs-3">
//               {!editMode ? "Add User Data" : "Update User Details"}
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label>Enter City</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="city"
//                     required
//                     value={formData.city || ""}
//                     onChange={handleInputChange}
//                   ></input>
//                 </div>
//                 <div className="mb-3">
//                   <label>Enter State</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="state"
//                     required
//                     value={formData.state || ""}
//                     onChange={handleInputChange}></input>
//                 </div>
//                 <div className="mb-3">
//                   <label>Enter Country</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="country"
//                     required
//                     value={formData.country || ""}
//                     onChange={handleInputChange}
//                   ></input>
//                 </div>
//                 <div className="text-center">
//                   <button className="btn btn-success">
//                     {editMode ? "update" : "Submit"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const mapDispatchToProps = (dispatch) => ({
//   dispatchSubmitAddressInfo: (formData) =>
//     dispatch(submitAddressInfo(formData)),
// });

// export default withCounter(connect(null, mapDispatchToProps)(AddressInfo));

// // export default AddressInfo;
