// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ArtData = () => {
//   const [editingArtId, setEditingArtId] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [artData, setArtData] = useState([]);
//   const [editedArt, setEditedArt] = useState({
//     artsID: '',
//     title: '',
//     description: '',
//     price: '',
//     style: '',
//   });

//   useEffect(() => {
//     const fetchArt = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/art');
//         setArtData(response.data.artsData);
//       } catch (error) {
//         console.error('Error fetching art data:', error);
//       }
//     };
//     fetchArt();
//   }, []);

//   const handleEdit = (artID) => {
//     setEditingArtId(artID);
//     setEditMode(true);
//     const foundArt = artData.find((art) => art.artsID === artID);
//     setEditedArt(foundArt);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedArt((prevArt) => ({
//       ...prevArt,
//       [name]: value,
//     }));
//   };

//   const handleCancel = () => {
//     setEditedArt({
//       artsID: '',
//       title: '',
//       description: '',
//       price: '',
//       style: '',
//     });
//     setEditMode(false);
//     setEditingArtId(null);
//   };

//   const handleUpdate = async (artsID) => {
//     try {
//       const response = await axios.put(`http://localhost:3001/updateArt/${artsID}`, editedArt);

//       if (response.status === 200) {
//         console.log('Art details updated successfully!');
//         alert('Info updated');
//         setEditMode(false);
//         setEditingArtId(null);
//         const updatedArtData = artData.map((art) => (art.artsID === artsID ? editedArt : art));
//         setArtData(updatedArtData);
//       } else {
//         console.error('Failed to update art details');
//       }
//     } catch (error) {
//       console.error('Error updating art details:', error);
//     }
//   };

//   const handleDelete = async (artsID) => {
//     try {
//       const response = await axios.delete(`http://localhost:3001/deleteArt/${artsID}`);

//       if (response.status === 200) {
//         console.log('Art deleted successfully!');
//         const updatedArt = artData.filter((art) => art.artsID !== artsID);
//         setArtData(updatedArt);
//       } else {
//         console.error('Failed to delete art');
//       }
//     } catch (error) {
//       console.error('Error deleting art:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Art Data</h2>
//       <table className="table-auto">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Title</th>
//             <th className="border px-4 py-2">Description</th>
//             <th className="border px-4 py-2">Style</th>
//             <th className="border px-4 py-2">Price</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {artData.map((art) => (
//             <tr key={art.artsID}>
//               <td className="border px-4 py-2">{art.title}</td>
//               <td className="border px-4 py-2">{art.description}</td>
//               <td className="border px-4 py-2">{art.style}</td>
//               <td className="border px-4 py-2">{art.price}</td>
//               <td className="border px-4 py-2">
//                 {!editMode && (
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleEdit(art.artsID)}
//                   >
//                     Edit
//                   </button>
//                 )}
//                 {editMode && (
//                   <>
//                     <button
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                       onClick={() => handleUpdate(art.artsID)}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                       onClick={handleCancel}
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 )}
//                 <button
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
//                   onClick={() => handleDelete(art.artsID)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ArtData;\
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtData = () => {
  const [editingArtId, setEditingArtId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [artData, setArtData] = useState([]);
  const [editedArt, setEditedArt] = useState({
    artsID: '',
    title: '',
    description: '',
    price: '',
    style: '',
  });

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const response = await axios.get('http://localhost:3001/art');
        setArtData(response.data.artsData);
      } catch (error) {
        console.error('Error fetching art data:', error);
      }
    };
    fetchArt();
  }, []);

  const handleEdit = (artID) => {
    setEditingArtId(artID);
    setEditMode(true);
    const foundArt = artData.find((art) => art.artsID === artID);
    setEditedArt(foundArt);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedArt((prevArt) => ({
      ...prevArt,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditedArt({
      artsID: '',
      title: '',
      description: '',
      price: '',
      style: '',
    });
    setEditMode(false);
    setEditingArtId(null);
  };

  const handleUpdate = async (artsID) => {
    try {
      const response = await axios.put(`http://localhost:3001/updateArt/${artsID}`, editedArt);

      if (response.status === 200) {
        console.log('Art details updated successfully!');
        alert('Info updated');
        setEditMode(false);
        setEditingArtId(null);
        const updatedArtData = artData.map((art) => (art.artsID === artsID ? editedArt : art));
        setArtData(updatedArtData);
      } else {
        console.error('Failed to update art details');
      }
    } catch (error) {
      console.error('Error updating art details:', error);
    }
  };

  const handleDelete = async (artsID) => {
    try {
      const response = await axios.delete(`http://localhost:3001/deleteArt/${artsID}`);

      if (response.status === 200) {
        console.log('Art deleted successfully!');
        const updatedArt = artData.filter((art) => art.artsID !== artsID);
        setArtData(updatedArt);
      } else {
        console.error('Failed to delete art');
      }
    } catch (error) {
      console.error('Error deleting art:', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-evenly">
      {artData.map((details) => (
        <div key={details.artsID} className='flex flex-col w-72 justify-evenly m-2'> 
          <div className='bg-white mb-3 rounded-[10px] p-3 flex flex-col'>
            {editMode && editingArtId === details.artsID ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editedArt.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="border p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  name="description"
                  value={editedArt.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="border p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  name="price"
                  value={editedArt.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="border p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  name="style"
                  value={editedArt.style}
                  onChange={handleInputChange}
                  placeholder="Style"
                  className="border p-2 mb-2 rounded"
                />
              </div>
            ) : (
              <div>
                <div className='font-bold'>{details.title}</div>
                <div className='flex flex-row space-x-5'>
                  <div className=''>₹{details.price}</div>
                  <div className=''>{details.style}</div>
                </div>
              </div>
            )}
            {!editMode && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => handleEdit(details.artsID)}
              >
                Edit
              </button>
            )}
            {editMode && editingArtId === details.artsID && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleUpdate(details.artsID)}
                >
                  Update
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleDelete(details.artsID)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtData;
