import React from 'react';

const MyAccount = ({ details }) => {
  const { email, name, streetName, city, state, pincode } = details;
  return (
    <div className="border border-gray-300 p-4 rounded mb-4">
      <ul className="list-disc">
        <li>
          <span className="font-bold">Name:</span> {name}
        </li>
        <li>
          <span className="font-bold">Address:</span>
          <ul className="list-none">
            <li>
              <span className="font-bold">Email:</span> {email}
            </li>
            <li>
              <span className="font-bold">Street Name:</span> {streetName}
            </li>
            <li>
              <span className="font-bold">City:</span> {city}
            </li>
            <li>
              <span className="font-bold">State:</span> {state}
            </li>
            <li>
              <span className="font-bold">Pincode:</span> {pincode}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default MyAccount;
