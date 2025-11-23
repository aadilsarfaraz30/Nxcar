"use client";

import { svgIcon } from "@/utils/constants";
import Image from "next/image";

export interface CarItem {
  vehicle_id: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  fuel_type: string;
  transmission: string;
  price: string;
  emi: string;
  seller_name: string;
  city_name: string;
  created_date: string;
  images: string | null;
}


const CarCard = ({ car }: { car: CarItem }) => {
  const imgSrc =
    car.images !== null
      ? car.images
      : "https://placehold.co/600x400"; // fallback image


   

  return (
    <div
      className="
        w-full max-w-[280px]
        bg-white 
        rounded-2xl 
        shadow-[0_2px_10px_rgba(0,0,0,0.15)] 
        overflow-hidden 
        cursor-pointer
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-[150px]">
        <picture>
            <img
          src={imgSrc}
          alt={car.model}
          className="object-cover h-full w-full"
        />
        </picture>

      </div>

      <div className="p-3">
        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[16px] text-gray-900 truncate">
            {car.year} {car.make} {car.model}
          </h2>
        </div>

        {/* Specs */}
        <p className="text-[13px] text-hi mt-1">
          {Number(car.mileage).toLocaleString()} Km • {car.fuel_type} •{" "}
          {car.transmission}
        </p>

        {/* Price + EMI */}
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-[18px] text-gray-900">
            ₹{(Number(car.price) / 100000).toFixed(2)} L
          </p>

          <p className="text-[12px] text-gray-700">
            EMI at ₹{Number(car.emi).toLocaleString()}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-3 flex items-center justify-between bg-hi bg-opacity-90 text-white py-2 px-3 rounded-lg">
          <span className="text-[13px] text-black">{car.seller_name}</span>

          <div className="flex items-center gap-1">
            <span className="text-[13px] text-black">{car.city_name}</span>
            <Image
              src={svgIcon.location}
              alt="loc"
              width={14}
              height={14}
            />
          </div>
        </div>

        {/* Date */}
        <p className="text-[12px] text-gray-400 text-center mt-2">
          {new Date(car.created_date).toLocaleDateString("en-GB")}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
