import React, { useState } from "react";

const MyAccount = ({ details }) => {
  const [updatedDetails, setUpdatedDetails] = useState({ ...details });
  const [editMode, setEditMode] = useState(false);
  const [tempDetails, setTempDetails] = useState({ ...details });

  const { email, name, streetName, city, state, pincode } = updatedDetails;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setTempDetails({ ...updatedDetails });
    setEditMode(true);
  };

  const handleCancel = () => {
    setUpdatedDetails({ ...tempDetails });
    setEditMode(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/updateAccount/${details.userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDetails),
        }
      );

      if (response.ok) {
        console.log("Account details updated successfully!");
        alert("Info updated");
        setTempDetails({ ...updatedDetails });
        setEditMode(false);
      } else {
        console.error("Failed to update account details");
      }
    } catch (error) {
      console.error("Error updating account details:", error);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded mb-4">
      <ul className="list-disc">
        <li>
          <span className="font-bold">Name:</span>{" "}
          {editMode ? (
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="highlight"
            />
          ) : (
            <span>{name}</span>
          )}
        </li>
        <li>
          <span className="font-bold">Address:</span>
          <ul className="list-none">
            <li>
              <span className="font-bold">Email:</span>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="highlight"
                />
              ) : (
                <span>{email}</span>
              )}
            </li>
            <li>
              <span className="font-bold">Street Name:</span>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="streetName"
                  value={streetName}
                  onChange={handleInputChange}
                  className="highlight"
                />
              ) : (
                <span>{streetName}</span>
              )}
            </li>
            <li>
              <span className="font-bold">City:</span>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleInputChange}
                  className="highlight"
                />
              ) : (
                <span>{city}</span>
              )}
            </li>
            <li>
              <span className="font-bold">State:</span>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={handleInputChange}
                  className="highlight"
                />
              ) : (
                <span>{state}</span>
              )}
            </li>
            <li>
              <span className="font-bold">Pincode:</span>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="pincode"
                  value={pincode}
                  onChange={handleInputChange}
                  className="highlight"
                />
              ) : (
                <span>{pincode}</span>
              )}
            </li>
          </ul>
        </li>
      </ul>
      {!editMode && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
      )}
      {editMode && (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleUpdate}
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
    </div>
  );
};

export default MyAccount;
