import React from 'react'
import Art from './Art'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Arts = () => {

    const { userID } = useParams();
    console.log(userID);

    const [artData, setArtData] = useState([]);

    useEffect(() => {
        // Fetch art data from the backend when the component mounts
        axios.get('http://localhost:3001/art')
        .then(response => {
            // Set the fetched art data to state
            setArtData(response.data.artsData);
            console.log("Frontend");
            console.log(response.data.artsData);
        })
        .catch(error => {
            console.error('Error fetching art data:', error);
        });
    }, []);


    return (
        <div className='flex flex-row flex-wrap justify-center'>
            
            {artData.map((art) => (
                <Art
                    key={art.artsID} // Don't forget to include a unique key
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
    )
}

export default Arts