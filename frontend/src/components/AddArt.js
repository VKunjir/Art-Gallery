import { React, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

function AddArt() {

    const { userID } = useParams(); // Extract userID from the route parameters
    console.log(userID); // Check if userID is received correctly

    // title, description, price, style, dateCreated, image
    const [title, setTitle] = useState();
    const [description, setDescription] = useState(); 
    const [price, setPrice] = useState(); 
    const [style, setStyle] = useState(); 
    const [dateCreated, setDateCreated] = useState(); 
    const [image, setImage] = useState(); 


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userID', userID);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('style', style);
        formData.append('dateCreated', dateCreated);
        formData.append('image', image);
    
        try {
            const result = await axios.post(`http://localhost:3001/addArt/${userID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(result);
            navigate(`/home/${userID}`);
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url('http://www.anorderededucation.com/uploads/2/2/9/9/22996998/img-3061_orig.jpg')"}}>
            <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
                <h1 className="text-4xl text-white font-bold  text-center mb-6">Create Art</h1>
                <form onSubmit={handleSubmit} action="">
                {/* Title */}
                <div className="relative my-4">
                    <input type="text" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" 
                    name="title"
                    onChange={(e)=> setTitle(e.target.value)} 
                    />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Title of Art</label>
                    
                </div>

                {/* description */}
                <div className="relative my-4">
                    <input type="text" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" 
                    name="description"
                    onChange={(e)=> setDescription(e.target.value)} 
                    />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Write Description</label>

                </div>

                {/* price */}
                <div className="relative my-4">
                    <input type="number" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                    name="price"
                    onChange={(e)=> setPrice(e.target.value)} 
                    />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Price</label>
                </div>

                {/* style */}
                <div className="relative my-4">
                    <input type="text" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                    name="style"
                    onChange={(e)=> setStyle(e.target.value)} 
                    />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Style of Art</label>
                </div>

                {/* dateCreated */}
                <div className="relative my-4">
                    <input type="date" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" 
                    name="dateCreated"
                    onChange={(e)=> setDateCreated(e.target.value)} 
                    />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Art Create Date</label>
                </div>

                {/* image */}
                <div className="relative my-4">
                    <input type="file" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" 
                    name="image"
                    onChange={event => setImage(event.target.files[0])}
                    />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Select Art Image</label>
                </div>

                
                {/* add new art */}
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type="submit">Add Art</button>
                </form>
                <div className='text-xl bg-black text-white p-2 rounded-lg mt-4 text-center'>
                    <Link to={`/home/${userID}`} style={{ textDecoration: 'none', color: 'white' }}>
                    Back
                    </Link>
                </div>
                        </div>
        </div>
  )
}

export default AddArt