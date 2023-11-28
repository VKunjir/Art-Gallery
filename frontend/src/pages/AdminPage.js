import React, { useState } from 'react';

// Assume you have separate components for User, Art, and Order
import UserData from '../components/UserData';
import ArtData from '../components/ArtData';
import OrderData from '../components/OrderData';


const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex h-screen">
      {/* Side Panel */}
      <div className="w-1/4 bg-gray-200 p-4">
        <div className="mb-4">
          <div
            className={`cursor-pointer p-2 rounded-md ${
              selectedOption === 'User' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleOptionClick('User')}
          >
            User
          </div>
          <div
            className={`cursor-pointer p-2 rounded-md ${
              selectedOption === 'Art' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleOptionClick('Art')}
          >
            Art
          </div>
          {/* <div
            className={`cursor-pointer p-2 rounded-md ${
              selectedOption === 'Order' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleOptionClick('Order')}
          >
            Order
          </div> */}
        </div>
      </div>

      {/* Display data based on the selected option */}
      <div className="flex-1 p-4">
        {selectedOption === 'User' && <UserData />}
        {selectedOption === 'Art' && <ArtData />}
        {/* {selectedOption === 'Order' && <OrderData />} */}
      </div>
    </div>
  );
};

export default AdminPage;
