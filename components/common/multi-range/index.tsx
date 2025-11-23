"use client";

import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (value: { min: number; max: number }) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (min < max) {
      setMinVal(min);
      setMaxVal(max);
    }
  }, [min, max]);

  const percent = useCallback(
    (value: number) =>
      Math.round(((value - min) / Math.max(max - min, 1)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (highlightRef.current && maxRef.current) {
      const left = percent(minVal);
      const right = percent(Number(maxRef.current.value));
      highlightRef.current.style.left = `${left}%`;
      highlightRef.current.style.width = `${right - left}%`;
    }
  }, [minVal, percent]);

  useEffect(() => {
    if (highlightRef.current && minRef.current) {
      const left = percent(Number(minRef.current.value));
      const right = percent(maxVal);
      highlightRef.current.style.width = `${right - left}%`;
    }
  }, [maxVal, percent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <div className="relative w-full mt-6 flex items-center justify-center">
      {/* MIN RANGE */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const val = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(val);
        }}
        className="absolute w-full appearance-none bg-transparent outline-none z-[3] cursor-pointer"
      />

      {/* MAX RANGE */}
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const val = Math.max(Number(e.target.value), minVal + 1);
          setMaxVal(val);
        }}
        className="absolute w-full appearance-none bg-transparent outline-none z-[4] cursor-pointer"
      />

      {/* TRACK */}
      <div className="relative w-full h-2">
        <div className="absolute h-[5px] w-full rounded bg-gray-300" />

        {/* SELECTED RANGE */}
        <div
          ref={highlightRef}
          className="absolute h-[5px] bg-teal-500 rounded z-[2]"
        />
      </div>

      {/* THUMB STYLING */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          margin-top: -6px; /* Center thumb vertically */
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 2px #9ca3af;
          border: 1px solid #d1d5db;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 2px #9ca3af;
          border: 1px solid #d1d5db;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MultiRangeSlider;
