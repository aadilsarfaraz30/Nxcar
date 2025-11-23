"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/components/hooks/useStore";
import { fetchCars } from "@/store/features/cars-slice";
import CarCard from "@/components/common/car-card";
import FiltersSidebar from "@/components/module/filter-sidebar";

const HomePageIndex = () => {
  const dispatch = useAppDispatch();
  const { data: carsData, loading } = useAppSelector((state) => state.carsSlice);
   const { selectedCity } = useAppSelector((state) => state.citySlice);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);
  const [cars, setCars] = useState<any[]>([]);
  const [filterPayload, setFilterPayload] = useState<any[]>([]);

  const isFetchingMore = useRef(false);

  const buildPayload = (pageNo: number) => ({
    page: pageNo,
    fltr: [
    ...filterPayload,
    { city_id: selectedCity?.city_id ?? "76" } 
  ],
    sort: null,
    sort_by: null,
  });

  const fetchCarsData = async (pageNo: number, reset = false) => {
    try {
      isFetchingMore.current = true;

      const response = await dispatch(fetchCars(buildPayload(pageNo))).unwrap();

      setCars((prev) =>
        reset ? response.allcars : [...prev, ...response.allcars]
      );

      setPage(pageNo);
    } finally {
      isFetchingMore.current = false;
    }
  };


  useEffect(() => {
    fetchCarsData(1, true);
  }, [filterPayload, selectedCity]);

  // Scroll Listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 150;

      if (isNearBottom && !loading && !isFetchingMore.current) {
        const totalPages = carsData?.pagination?.total_pages ?? 1;

        if (page < totalPages) {
          fetchCarsData(page + 1);
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, page, carsData]);

  // Handle Filter Apply
  const handleApplyFilters = (fltr: any[]) => {
    setFilterPayload(fltr); 
    setPage(1);
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <section className="w-1/4 shadow-right-only overflow-auto">
        {carsData?.filters && (
          <FiltersSidebar
            filters={carsData.filters}
            onApplyFilters={handleApplyFilters}
          />
        )}
      </section>

      <section
        ref={scrollRef}
        className="w-3/4 flex flex-wrap gap-10 overflow-auto relative p-4"
      >
        {cars.map((car, idx) => (
          <CarCard key={idx} car={car} />
        ))}

        {loading && (
          <p className="text-center w-full py-4 text-gray-500">
            Loading more cars...
          </p>
        )}
      </section>
    </div>
  );
};

export default HomePageIndex;
