import React from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const ArtDetails = () => {
    const { id } = useParams();
    console.log(id);
    const [artData, setArtData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/artDet/${id}`);
                setArtData(response.data.artsData);
                // console.log(response.data.artsData.userID);
            } catch (error) {
                console.error('Error fetching art data:', error);
            }
        };

        fetchData();
    }, []);

    const data =
    {
        id: id,
        userID: artData.userID,
        title: artData.title,
        artist: 'Leonardo Da Vinci',
        img: artData.image,
        price: artData.price,
        description: artData.description,
        rating: 4.5
    }

    const handelCart = async (e) =>{
        try {
            const res = await axios.post(`http://localhost:3001/addCart/${data.userID}`,{
                artsID:data.id,
                userID: data.userID,
                quantity:1,
                price:data.price,
                image:data.img
            });
            console.log(res.status);
            if (res.status === 200) {
                // Show success message
                toast.success('Added to cart Sucessfully', { autoClose: 3000 }); // Adjust the duration as needed
              }
        } catch (error) {
            console.error('Error fetching art data:', error);
        }
    }

    const handelWishlist = async (e) =>{
        try {
            const res = await axios.post(`http://localhost:3001/addwish/${data.userID}`,{
                artsID:data.id,
                userID: data.userID,
            });
            console.log(res.status);
            if (res.status === 200) {
                // Show success message
                toast.success('Added to cart Sucessfully', { autoClose: 3000 }); // Adjust the duration as needed
              }
        } catch (error) {
            console.error('Error fetching art data:', error);
        }
    }

    return (
        <div>

            <div className='m-12 flex flex-row w-[90%] justify-evenly'>
                <div className={`w-[500px] h-[500px] bg-black rounded-[10px] overflow-hidden`}>
                    <img src={`http://localhost:3001/uploads/${data.img}`} alt="painting" className=' object-fill' />
                    <div onClick={handelWishlist} className='text-xl bg-black text-white p-2 rounded-lg w-full'>
                            ❤️ Add to Wishlist
                    </div>
                </div>

                <div className='bg-white mb-3 rounded-[10px] p-3 flex flex-col w-96 justify-evenly'>
                    <div className='font-bold text-4xl'>{data.title}</div>
                    <div className='text-1xl'>by {data.artist}</div>
                    <div className='text-2xl'>₹{data.price}</div>
                    <div className='text-lg'>{data.rating}⭐</div>

                    <div><hr className='border-black border-[2px]'/></div>
                    <div>{data.description}</div>
                    <div className="flex">
                        <div
                        onClick={handelCart}
                        className='flex items-center justify-center text-xl bg-black text-white py-2 px-4 rounded-lg w-32 mr-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer'
                        >
                        Add to Cart
                        </div>

                        <div className='text-xl bg-black text-white p-2 rounded-lg w-32'>
                            <Link to={`/order/${data.userID}/${artData.artsID}`} style={{ textDecoration: 'none', color: 'white' }}>
                                Order Now
                            </Link>
                        </div>
                        
                    </div>
                    <div className='text-xl bg-black text-white p-2 rounded-lg w-32'>
                    <Link to={`/home/${data.userID}`} style={{ textDecoration: 'none', color: 'white' }}>
                        Back
                    </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ArtDetails;