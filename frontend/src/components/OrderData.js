import React from 'react';

const OrderData = () => {
  // Placeholder data (replace this with actual fetched data)
  const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more user data here if needed
  ];

  return (
    <div>
      <h2>Order Data</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {/* Delete and Update buttons (implement functionality) */}
                <button className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderData;
