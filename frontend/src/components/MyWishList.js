import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Art from "./Art";

const MyWishList = () => {
  const { userID } = useParams();
  const [wishData, setWishlist] = useState([]);
  const [artData, setArtData] = useState([]);

  useEffect(() => {
    // Fetch wishlist data
    axios
      .get(`http://localhost:8000/getwishlist/${userID}`)
      .then((response) => {
        // Set the fetched wishlist data to state
        setWishlist(response.data);
        console.log("Frontend - Wishlist Data:", response.data.myWish);

        // Fetch detailed art data for each item in wishlist
        const fetchArtData = async () => {
          const artPromises = response.data.map(async (item) => {
            const artResponse = await axios.get(
              `http://localhost:8000/artDet/${item.artsID}`
            );
            return artResponse.data.artsData;
          });
          const artsData = await Promise.all(artPromises);
          setArtData(artsData);
          console.log("Frontend - Art Data:", artsData);
        };

        fetchArtData();
      })
      .catch((error) => {
        console.error("Error fetching wishlist data:", error);
      });
  }, [userID]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-5xl">Your Wishlist here</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {artData.map(
          (art) => (
            console.log(art.image),
            (
              <Art
                key={art.artsID}
                details={{
                  id: art.artsID,
                  title: art.title,
                  artist: art.artist,
                  img: art.image,
                  price: art.price,
                  rating: art.rating,
                }}
              />
            )
          )
        )}
      </div>
      <div className="text-xl bg-black text-white p-2 rounded-lg mt-4">
        <Link
          to={`/home/${userID}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default MyWishList;
