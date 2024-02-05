import React, { useState, useEffect } from "react";

const UserData = () => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({
    userID: "",
    name: "",
    email: "",
    streetName: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    setEditMode(true);
    const foundUser = users.find((user) => user.userID === userId);
    setEditedUser(foundUser);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditedUser({
      userID: "",
      name: "",
      email: "",
      streetName: "",
      city: "",
      state: "",
      pincode: "",
    });
    setEditMode(false);
    setEditingUserId(null);
  };

  const handleUpdate = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:8000/updateAccount/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (response.ok) {
        console.log("User details updated successfully!");
        alert("Info updated");
        setEditedUser({
          // userID: response.updatedUser.userID,
          name: response.updatedUser.name,
          email: response.updatedUser.email,
          streetName: response.updatedUser.streetName,
          city: response.updatedUser.city,
          state: response.updatedUser.state,
          pincode: response.updatedUser.pincode,
        });
        setEditMode(false);
        setEditingUserId(null);
      } else {
        console.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleDelete = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:8000/deleteUser/${userID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("User deleted successfully!");
        const updatedUsers = users.filter((user) => user.userID !== userID);
        setUsers(updatedUsers);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>User Data</h2>
      {users.map((user) => (
        <div
          key={user.userID}
          className="border border-gray-300 p-4 rounded mb-4"
        >
          {editingUserId === user.userID ? (
            <ul className="list-disc">
              <li>
                <span className="font-bold">Name:</span>{" "}
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="highlight"
                />
              </li>
              <li>
                <span className="font-bold">Email:</span>{" "}
                <input
                  type="text"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="highlight"
                />
              </li>
              <li>
                <span className="font-bold">Street Name:</span>{" "}
                <input
                  type="text"
                  name="streetName"
                  value={editedUser.streetName}
                  onChange={handleInputChange}
                  className="highlight"
                />
              </li>
              <li>
                <span className="font-bold">City:</span>{" "}
                <input
                  type="text"
                  name="city"
                  value={editedUser.city}
                  onChange={handleInputChange}
                  className="highlight"
                />
              </li>
              <li>
                <span className="font-bold">State:</span>{" "}
                <input
                  type="text"
                  name="state"
                  value={editedUser.state}
                  onChange={handleInputChange}
                  className="highlight"
                />
              </li>
              <li>
                <span className="font-bold">Pincode:</span>{" "}
                <input
                  type="text"
                  name="pincode"
                  value={editedUser.pincode}
                  onChange={handleInputChange}
                  className="highlight"
                />
              </li>
              {/* Add other editable fields similarly */}
            </ul>
          ) : (
            <ul className="list-disc">
              <li>
                <span className="font-bold">Name:</span>{" "}
                <span>{user.name}</span>
              </li>
              <li>
                <span className="font-bold">Email:</span>{" "}
                <span>{user.email}</span>
              </li>
              <li>
                <span className="font-bold">Street Name:</span>{" "}
                <span>{user.streetName}</span>
              </li>
              <li>
                <span className="font-bold">City:</span>{" "}
                <span>{user.city}</span>
              </li>
              <li>
                <span className="font-bold">State:</span>{" "}
                <span>{user.state}</span>
              </li>
              <li>
                <span className="font-bold">Pincode:</span>{" "}
                <span>{user.pincode}</span>
              </li>
              {/* Add other non-editable fields similarly */}
            </ul>
          )}
          {!editMode && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleEdit(user.userID)}
            >
              Edit
            </button>
          )}
          {editMode && (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleUpdate(user.userID)}
              >
                Update
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleDelete(user.userID)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserData;
