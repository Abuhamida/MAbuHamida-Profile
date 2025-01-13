"use client";
import React, { useState, useEffect } from "react";
import { FaAward } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

export default function Awards() {
  const [data, setData] = useState<any[]>([]);
  const getData = async () => {
    try {
      const response = await fetch("/api/awards/get"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" p-4 md:p-6 overflow-hidden">
      <h1 className="text-4xl font-bold mb-4 text-secondary flex items-center gap-2">
        <FaAward />
        My Awards
      </h1>
      {data && data.length > 0 ? (
        <div className="flex gap-10 flex-wrap justify-center items-center w-full">
          {data.map((award, index) => (
            <div
              key={index}
              className="w-80 md:w-96 h-56 flex flex-col justify-center items-stretch shadow-lg shadow-primary/10 p-5 rounded-lg transition-all duration-1000 hover:bg-box-gradient-2 bg-box-gradient-1 "
            >
              <h2 className="text-xl font-semibold text-primary text-left">
                {award.title}
              </h2>
              <p className="text-sm text-gray-400">{award.description}</p>
              <span className="text-xs text-gray-500">{award.year}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full min-h-96 justify-center items-center">
          <FaSpinner className="animate-spin-slow text-secondary text-4xl " />
        </div>
      )}
    </div>
  );
}
