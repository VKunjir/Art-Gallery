import React from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import MyOrderDetail from "./MyOrderDetail";



const MyOrder = () => {

    const { userID } = useParams();
    console.log(userID);
    const [artData, setArtData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/myorder/${userID}`);
                console.log(response.data);                
                setArtData(response.data);
                // console.log(response.data.artsData.userID);
            } catch (error) {
                console.error('Error fetching art data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex flex-col items-center'>
      <h1 className='font-bold text-5xl'>Your order</h1>
      <div className='flex flex-row flex-wrap justify-center'>
        {artData.map((art) => (
          <MyOrderDetail
            key={art.orderID}
            details={{
              id: art.orderID,
              date: art.orderDate,
              price: art.price,
              status: art.status,
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
    )
}

export default MyOrder;