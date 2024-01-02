import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { deleteUserStart, loadUsersStart, updateUserStart } from "../redux/action";
import { Link } from "react-router-dom";

const Home = ({ users }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(loadUsersStart());
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle the error, e.g., display an error message
    }
  }, [dispatch, users]);

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this user?")) {
      dispatch(deleteUserStart(id));
      alert("User deleted successfully");
    }
  };

  return (
    <div className="container">
      <h3 className="text-center mt-3">List of Users</h3>
      <table className="table mt-5">
        <thead className="bg-light">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Country</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.fullName || ""}</td>
                <td>{user.email || ""}</td>
                <td>{user.phone || ""}</td>
                <td>{user.city || ""}</td>
                <td>{user.state || ""}</td>
                <td>{user.country || ""}</td>

                <td>
                  <Link
                    to={`/editinfo/${user.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.data.users || [], // Assuming combined user data is in 'formValues'
});

export default connect(mapStateToProps)(Home);
