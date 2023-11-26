import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Art from './Art';

const MyArt = () => {
  const { userID } = useParams();
  const [artData, setArtData] = useState([]);

  useEffect(() => {
    // Fetch art data
    axios.get(`http://localhost:3001/myart/${userID}`)
      .then(response => {
        // Set the fetched art data to state
        setArtData(response.data.artData);
        console.log("Frontend");
        console.log(response.data.artData);
      })
      .catch(error => {
        console.error('Error fetching art data:', error);
      });
  }, [userID]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-5xl'>Your Art</h1>
      <div className='flex flex-row flex-wrap justify-center'>
        {artData.map((art) => (
          <Art
            key={art.artsID}
            details={{
              id: art.artsID,
              title: art.title,
              artist: art.artist,
              img: art.image,
              price: art.price,
              rating: art.rating
            }}
          />
        ))}
      </div>
      <div className='text-xl bg-black text-white p-2 rounded-lg mt-4'>
        <Link to={`/home/${userID}`} style={{ textDecoration: 'none', color: 'white' }}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default MyArt;
