"use client";
import Modal from "@/components/common/modal";
import { useAppDispatch, useAppSelector } from "@/components/hooks/useStore";
import CityList from "@/components/module/city-list";
import { fetchCity } from "@/store/features/cities-slice";
import { svgIcon } from "@/utils/constants";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const { data: cities ,selectedCity} = useAppSelector((state) => state.citySlice);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCity());
  }, []);

  return (
    <div className="w-full h-20 p-4 flex justify-between shadow-sm">
      <Image
        src={svgIcon.logo}
        alt="logo"
        width={100}
        height={100}
        loading="lazy"
        quality={100}
      />
      <div
        onClick={() => setOpenModal(true)}
        className="flex h-[50px] items-center bg-white px-4 py-2 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.12)] gap-4"
      >
        <Image
          src={svgIcon.location}
          alt="logo"
          width={1000}
          className="h-[15px] w-[15px]"
          height={1000}
          loading="lazy"
        />
        <span>{selectedCity ? selectedCity?.city_name : "Delhi"}</span>
        <Image
          src={svgIcon.dropDown}
          alt="logo"
          width={1000}
          className="h-[15px] w-[15px]"
          height={1000}
          loading="lazy"
        />
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <CityList cities={cities} onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};

export default Header;
