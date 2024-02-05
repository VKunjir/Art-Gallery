import React from "react";
import { Link } from "react-router-dom";

const Art = ({ details }) => {
  console.log(details.img);
  return (
    <Link to={`/artdetail/${details.id}`}>
      <div className="flex flex-col w-72 justify-evenly m-2">
        <div
          className={`w-[200px] h-[300px] bg-black rounded-[10px] overflow-hidden`}
        >
          <img
            src={`http://localhost:8000/uploads/${details.img}`}
            alt="painting"
            className=" object-fill"
          />
        </div>

        <div className="bg-white mb-3 rounded-[10px] p-3 flex flex-col">
          <div className="font-bold">{details.title}</div>
          {/* <div className='text-[12px]'>by {details.artist}</div> */}

          <div className="flex flex-row space-x-5">
            <div className="">₹{details.price}</div>
            {/* <div className=''>{details.rating}⭐</div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Art;
