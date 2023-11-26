import React from 'react'
import Navbar from '../components/Navbar'
import Art from '../components/Art'

const Wishlist = () => {
    return (
        <div>
            <Navbar />

            <div className='m-10'>
                <div className='text-3xl m-12 flex flex-row items-center'>
                    Your Wishlist
                    <div className='ml-20 text-xl bg-black text-white p-2 rounded-lg'> Move All to Cart</div>
                </div>

            </div>

            <div className='flex flex-row flex-wrap justify-start ml-24'>
                <Art
                    details={{
                        title: 'Mona Lisa',
                        artist: 'Leonardo Da Vinci',
                        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
                        price: 5000,
                        rating: 4.5
                    }} />

                <Art
                    details={{
                        title: 'The Wine Glass',
                        artist: 'Johannes Vermeer',
                        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jan_Vermeer_van_Delft_-_The_Glass_of_Wine_-_Google_Art_Project.jpg/1024px-Jan_Vermeer_van_Delft_-_The_Glass_of_Wine_-_Google_Art_Project.jpg',
                        price: 2000,
                        rating: 4.3
                    }} />
            </div>
        </div>
    )
}

export default Wishlist