"use client";

import AccordionItem from "@/components/common/accordion";
import { useEffect, useState } from "react";



const FiltersSidebar = ({ filters, onApplyFilters }: any) => {
  const priceFilter = filters.find((f: any) => f.name === "price");
  const yearFilter = filters.find((f: any) => f.name === "year");
  const makeFilter = filters.find((f: any) => f.name === "make");

  const [selectedPrice, setSelectedPrice] = useState<any>({
    min: null,
    max: null,
  });
  const [selectedYear, setSelectedYear] = useState<any>({
    min: null,
    max: null,
  });
  const [selectedMakes, setSelectedMakes] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState<any[]>([]);

  const applyFilters = () => {
    const fltrPayload: any[] = [];

    // PRICE
    if (selectedPrice.min !== null && selectedPrice.max !== null) {
      fltrPayload.push({
        type: "range",
        name: "price",
        selected_min: Number(selectedPrice.min),
        selected_max: Number(selectedPrice.max),
        min: Number(selectedPrice.min),
        max: Number(selectedPrice.max),
      });
    }

    // YEAR
    if (selectedYear.min !== null && selectedYear.max !== null) {
      fltrPayload.push({
        type: "range",
        name: "year",
        selected_min: Number(selectedYear.min),
        selected_max: Number(selectedYear.max),
        min: Number(selectedYear.min),
        max: Number(selectedYear.max),
      });
    }

    // MAKE FILTER
    if (selectedMakes.length > 0) {
      fltrPayload.push({
        type: "multiselect",
        name: "make",
        options: selectedMakes,
      });
    }

    // MODEL FILTER
    if (selectedModel.length > 0) {
      fltrPayload.push({
        type: "multiselect",
        name: "model",
        options: selectedModel,
      });
    }
    onApplyFilters(fltrPayload);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedPrice, selectedYear, selectedMakes, selectedModel]);

  return (
    <aside className="w-full p-4 flex flex-col gap-4">

      <AccordionItem title={priceFilter?.displayName} defaultOpen={true}>
        {priceFilter?.groups?.map((g: any) => (
          <div key={g.name} className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="price"
              onChange={() =>
                setSelectedPrice({
                  min: g.min,
                  max: g.max ?? 10000000,
                })
              }
            />
            <label>
              {g.displayName} ({g.count})
            </label>
          </div>
        ))}
      </AccordionItem>

      {/* YEAR ACCORDION */}
      <AccordionItem title={yearFilter?.displayName}>
        <div className="space-y-2">
          <input
            type="range"
            min={yearFilter?.min}
            max={yearFilter?.max}
            onChange={(e) =>
              setSelectedYear({
                min: yearFilter.min,
                max: Number(e.target.value),
              })
            }
          />

          <p className="text-sm text-gray-600">
            {yearFilter.min} - {selectedYear.max ?? yearFilter.max}
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title={makeFilter?.displayName}>
        {makeFilter?.options?.map((brand: any) => (
          <div key={brand.make_id} className="mb-4">

            <div className="mt-1 flex gap-2 items-center">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedMakes((prev) => [...prev, brand.make]);
                  } else {
                    setSelectedMakes((prev) =>
                      prev.filter((m) => m !== brand.make)
                    );
                  }
                }}
              />
              <label className="font-medium">
                {brand.make} ({brand.count})
              </label>
            </div>

            <div className="pl-3 mt-2">
              {brand.models.map((m: any) => (
                <div key={m.model_id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={m.model}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedModel((prev) => [...prev, m.model]);
                      } else {
                        setSelectedModel((prev) =>
                          prev.filter((x) => x !== m.model)
                        );
                      }
                    }}
                  />
                  <label>
                    {m.model} ({m.count})
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </AccordionItem>

    </aside>
  );
};

export default FiltersSidebar;
