import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MyAccount from "../components/MyAccount";

const Account = () => {
  const { userID } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios
      .get(`http://localhost:8000/account/${userID}`)
      .then((response) => {
        if (Array.isArray(response.data.userData)) {
          setUserData(response.data.userData);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userID]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Information</h1>
      <div className="grid grid-cols-1 gap-6">
        {userData.map((user) => (
          <div key={user.userID} className="bg-white shadow-md rounded-md p-6">
            <MyAccount
              details={{
                userID: user.userID,
                email: user.email,
                name: user.name,
                streetName: user.streetName,
                city: user.city,
                state: user.state,
                pincode: user.pincode,
              }}
            />
          </div>
        ))}
      </div>
      <div className="text-xl mt-4">
        <Link
          to={`/home/${userID}`}
          className="inline-block bg-black text-white py-2 px-4 rounded-lg text-center"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default Account;
