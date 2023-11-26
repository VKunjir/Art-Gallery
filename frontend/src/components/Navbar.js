import React from 'react'
import { Link } from 'react-router-dom'
import AddArt from "./AddArt"
import { useParams } from 'react-router-dom';

const Navbar = () => {

    const { userID } = useParams();
    // console.log(userID);

    return (
        <div className="bg-black w-full h-20 text-white flex justify-evenly items-center">
            <div className='font-extrabold text-3xl'>
                ArtGallery
            </div>

            <div className='flex flex-row space-x-5'>
                <div><Link to={`/home/${userID}`}>Home</Link></div>
                {/* <div>About</div> */}
                {/* <div>Login</div> */}
                {/* <div>Sign Up</div> */}

            </div>

            <div>

                <Link to={`/wishlist/${userID}`}>
                    ❤️  Wishlist
                </Link>

                <Link to={`/cart/${userID}`} className='ml-5'>
                    🛒 Cart
                </Link>

                <Link to={`/account/${userID}`} className='ml-5'>
                    👤 My Account
                </Link>
                <Link to={`/addArt/${userID}`} className='ml-5'>
                    🖌️ Add Art
                </Link>
                <Link to={`/art/${userID}`} className='ml-5'>
                    🖼️ My Art
                </Link>
                <Link to={`/myorder/${userID}`} className='ml-5'>
                    🛒 My order
                </Link>
                <Link to={'/'} className='ml-5'>
                    ↪ logout
                </Link>

            </div>
        </div>
    )
}

export default Navbar