import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ArtDetails = () => {
  const { id } = useParams();
  const [artData, setArtData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/artDet/${id}`);
        setArtData(response.data.artsData);
      } catch (error) {
        console.error("Error fetching art data:", error);
      }
    };

    fetchData();
  }, [id]);

  const data = {
    id: id,
    userID: artData.userID,
    title: artData.title,
    artist: "Leonardo Da Vinci",
    img: artData.image,
    price: artData.price,
    description: artData.description,
    rating: 4.5,
  };

  const handelCart = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/addCart/${data.userID}`,
        {
          artsID: data.id,
          userID: data.userID,
          quantity: 1,
          price: data.price,
          image: data.img,
        }
      );
      if (res.status === 200) {
        toast.success("Sign In Successfully", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handelWishlist = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/addwish/${data.userID}`,
        {
          artsID: data.id,
          userID: data.userID,
        }
      );
      if (res.status === 200) {
        toast.success("Added to wishlist successfully", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <div className="m-12 flex flex-row w-[90%] justify-evenly">
      <div
        className={`w-[500px] h-[500px] bg-black rounded-[10px] overflow-hidden`}
      >
        <img
          src={`http://localhost:8000/uploads/${data.img}`}
          alt="painting"
          className="object-fill"
        />
      </div>

      <div className="bg-white mb-3 rounded-[10px] p-3 flex flex-col w-96 justify-evenly">
        <div className="font-bold text-4xl">{data.title}</div>
        <div className="text-2xl">₹{data.price}</div>
        <div>
          <hr className="border-black border-[2px]" />
        </div>
        <div>Description: {data.description}</div>
        <div className="flex mt-4 flex-col items-center">
          <div
            onClick={handelWishlist}
            className="text-xl bg-black text-white p-2 rounded-lg w-[200px] cursor-pointer mb-3"
          >
            ❤️ Add to Wishlist
          </div>
          <div
            onClick={handelCart}
            className="flex items-center justify-center text-xl bg-black text-white py-2 px-4 rounded-lg w-[200px] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 mb-3"
          >
            Add to Cart
          </div>
          <div className="text-xl bg-black text-white p-2 rounded-lg w-[200px] mb-3">
            <Link
              to={`/order/${data.userID}/${artData.artsID}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Order Now
            </Link>
          </div>
          <div className="text-xl bg-black text-white p-2 rounded-lg w-[200px] mb-3">
            <Link
              to={`/home/${data.userID}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetails;
