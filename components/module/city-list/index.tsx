"use client";

import Chip from "@/components/common/chips";
import FloatingInput from "@/components/common/input";
import { useAppDispatch } from "@/components/hooks/useStore";
import { setSelectedCity } from "@/store/features/cities-slice";
import { City } from "@/store/features/cities-slice/type";
import Image from "next/image";
import { useState, useMemo } from "react";

interface CityListProps {
  cities: City[];
  onClose: () => void;
}

const CityList = ({ cities, onClose }: CityListProps) => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  // 🔍 FILTER CITIES BASED ON INPUT
  const filteredCities = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return cities;

    return cities.filter((city) =>
      city.city_name.toLowerCase().includes(query)
    );
  }, [search, cities]);

  return (
    <div className="">
      <h1>Choose any city where you would like to see cars.</h1>

      {/* 🔹 Search Input */}
      <FloatingInput
        label="Search City"
        value={search}
        onChange={setSearch}
        className="my-4"
      />

      {/* 🔹 Image Cities */}
      <div className="flex flex-wrap gap-3">
        {filteredCities
        .filter((city) => city.city_image !== null)
        .map((city) => (
          <div key={city.city_id} className="mb-3" onClick={() => {
            dispatch(setSelectedCity({
              city_id: city.city_id,
              city_name: city.city_name
            }))
            onClose()
          }}>
            <Image
              src={`https://api.nxcar.in/public/cities/${city.city_image}`}
              alt={city.city_name}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>

      {/* 🔹 Chip Cities */}
      <div className="flex flex-wrap">
        {filteredCities
        .filter((city) => city.city_image === null)
        .map((city) => (
          <div key={city.city_id} className="inline-block">
            <Chip
              label={city.city_name}
              onClick={() => {
                dispatch(setSelectedCity({
                  city_id: city.city_id,
                  city_name: city.city_name
                }))
                onClose()
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityList;
