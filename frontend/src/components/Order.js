import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const { userID, artsID } = useParams();
  console.log(userID, artsID);
  const [artData, setArtData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/artDet/${artsID}`
        );
        setArtData(response.data.artsData);
        // console.log(response.data.artsData.userID);
      } catch (error) {
        console.error("Error fetching art data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${userID}`
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    id: artsID,
    userID: artData.userID,
    title: artData.title,
    artist: "Leonardo Da Vinci",
    img: artData.image,
    price: artData.price,
    description: artData.description,
    rating: 4.5,
  };

  const handelOrder = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost:8000/placeOrder/${userID}/${artsID}`,
        {
          date: Date.now(),
          price: data.price,
          city: userData.city,
          state: userData.state,
          streetName: userData.streetName,
          pincode: userData.pincode,
        }
      );
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200) {
        // Show success message
        toast.success("Order placed successfully", { autoClose: 9000 }); // Adjust the duration as needed

        // Redirect to the home page programmatically
        window.location.href = `/myorder/${userID}`;
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      {/* <Navbar userID={data.userID}/> */}
      <form onSubmit={handelOrder}>
        <div className="m-12 flex flex-row w-[90%] justify-evenly">
          <div
            className={`w-[500px] h-[500px] bg-black rounded-[10px] overflow-hidden`}
          >
            <img
              src={`http://localhost:8000/uploads/${data.img}`}
              alt="painting"
              className=" object-fill"
            />
          </div>

          <div className="bg-white mb-3 rounded-[10px] p-3 flex flex-col w-96 justify-evenly">
            <h1 className="font-bold text-5xl">Art Detail</h1>
            <div className="font-bold text-2xl">Title : -{data.title}</div>
            {/* <div className='text-1xl'>by {data.description}</div> */}

            <div>
              <hr className="border-black border-[2px]" />
            </div>
            <div>{data.description}</div>
            <div className="text-lg">Description: - {data.description}</div>
            <div className="text-2xl">Total amount = ₹{data.price}</div>

            <div className="flex">
              <button
                className="flex flex-col text-xl bg-black text-white p-2 rounded-lg w-32 mr-4"
                type="submit"
              >
                {" "}
                Place order{" "}
              </button>
            </div>
            <div className="text-xl bg-black text-white p-2 rounded-lg w-32">
              <Link
                to={`/home/${data.userID}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
