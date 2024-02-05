// import React from 'react'
// import { Link } from 'react-router-dom'

// const MyArtDetail = ({ details }) => {

//   console.log(details.img) ;
//   return (
//     <Link to={`/artdetail/${details.id}`}>
//       <div className='flex flex-col w-72 justify-evenly m-2'>
//         <div className={`w-[200px] h-[300px] bg-black rounded-[10px] overflow-hidden`}>
//           <img src={`http://localhost:8000/uploads/${details.img}`} alt="painting" className=' object-fill'/>
//         </div>

//         <div className='bg-white mb-3 rounded-[10px] p-3 flex flex-col'>
//           <div className='font-bold'>{details.title}</div>
//           <div className='text-[12px]'>by {details.artist}</div>

//           <div className='flex flex-row space-x-5'>
//             <div className=''>₹{details.price}</div>
//             <div className=''>{details.rating}⭐</div>
//           </div>
//         </div>
//       </div>
//     </Link>

//   )
// }

// export default MyArtDetail;
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MyArtDetail = ({ details }) => {
  const [updatedTitle, setUpdatedTitle] = useState(details.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    details.description
  );
  const [updatedPrice, setUpdatedPrice] = useState(details.price);
  const [updatedStyle, setUpdatedStyle] = useState(details.style);
  const [updatedDate, setUpdatedDate] = useState(details.date);
  //   const [updatedImage, setUpdatedImage] = useState(details.image);
  const [isUpdating, setIsUpdating] = useState(false);
  const [tempArtDetails, setTempArtDetails] = useState({ ...details });
  const [editMode, setEditMode] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      const updatedData = {
        title: updatedTitle,
        description: updatedDescription,
        price: updatedPrice,
        style: updatedStyle,
        date: updatedDate,
        // image: updatedImage,
        // Add other fields that you want to update
      };

      const response = await axios.put(
        `http://localhost:8000/updateArt/${details.id}`,
        updatedData
      );

      if (response.status === 200) {
        toast.success("Art details updated successfully!");
        setTempArtDetails({ ...updatedData });
        setEditMode(false);
      } else {
        console.error("Failed to update art details");
        toast.error("Failed to update art details");
      }
    } catch (error) {
      console.error("Error updating art:", error);
      toast.error("Error updating art");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/deleteArt/${details.id}`
      );

      if (response.status === 200) {
        toast.success("Art deleted successfully!");
        window.location.reload(); // Reload the page after 2 seconds
      } else {
        console.error("Failed to delete art");
        toast.error("Failed to delete art");
      }
    } catch (error) {
      console.error("Error deleting art:", error);
      toast.error("Error deleting art");
    }
  };

  return (
    <div className="flex flex-col w-72 justify-evenly m-2">
      <div
        className={`w-[200px] h-[300px] bg-black rounded-[10px] overflow-hidden`}
      >
        <img
          src={`http://localhost:8000/uploads/${details.img}`}
          alt="painting"
          className="object-fill"
        />
      </div>

      <div className="bg-white mb-3 rounded-[10px] p-3 flex flex-col">
        {editMode ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <input
              type="text"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <input
              type="number"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
            <input
              type="text"
              value={updatedStyle}
              onChange={(e) => setUpdatedStyle(e.target.value)}
            />
            <input
              type="date"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
            />
            {/* <input
          type='file'
          value={updatedImage}
          onChange={(e) =>  setUpdatedImage(e.target.files[0])}
        /> */}
          </>
        ) : (
          <>
            <p className="font-bold mb-1">{tempArtDetails.title}</p>
            {/* Display other art details as per your UI */}
          </>
        )}

        {/* Toggle edit mode */}
        {!editMode ? (
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        )}

        {/* Delete button */}
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleDelete}
        >
          Delete
        </button>

        {isUpdating && <p>Updating...</p>}
      </div>
    </div>
  );
};

export default MyArtDetail;
