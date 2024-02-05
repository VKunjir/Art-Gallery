import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const MyOrderDetail = ({ details }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `http://localhost:8000/deleteOrder/${details.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDeletedSuccessfully(true);
        toast.success("Order deleted successfully!");
        setTimeout(() => {
          window.location.reload(); // Reload the page after 2 seconds
        }, 2000);
      } else {
        console.error("Failed to delete order");
        toast.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col w-72 justify-evenly m-2">
      <div className="bg-white mb-3 rounded-md p-3 flex flex-col shadow-md">
        <div className="font-bold text-lg">Order ID - {details.id}</div>
        <div className="text-sm text-gray-500">
          Order On - {new Date(details.date).toLocaleDateString("en-US")}
        </div>
        <div className="text-lg">Total cost - ₹{details.price}</div>
        <div
          className={`${
            details.status ? "text-green-500" : "text-red-500"
          } text-lg`}
        >
          {details.status ? "✔️ Not delivered" : "❌ Delivered"}
        </div>
        {!isDeleting && !deletedSuccessfully && (
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        {isDeleting && <p>Deleting...</p>}
        <Toaster /> {/* Render the toast container */}
      </div>
    </div>
  );
};

export default MyOrderDetail;
