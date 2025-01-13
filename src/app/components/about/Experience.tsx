"use client";
import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Experience() {
  const [data, setData] = useState<any[]>([]);
  const getData = async () => {
    try {
      const response = await fetch("/api/experience/get"); // Replace with actual API endpoint
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
    <div>
      {" "}
      <div className="w-full">
        {data && data.length > 0 ? (
          <ul className="flex gap-10 flex-wrap justify-center items-center w-full">
            {data.map((experience, index) => (
              <li
                key={index}
                className="w-80 md:w-96 h-56 flex flex-col justify-center items-stretch shadow-lg shadow-primary/10 p-5 rounded-lg transition-all duration-1000 hover:bg-box-gradient-2 bg-box-gradient-1 "
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                  <span className="text-xl font-semibold text-primary text-left">
                    {experience.role} at {experience.company}
                  </span>
                  <span className="text-white/50 dark:text-gray-500 italic">
                    {experience.year}
                  </span>
                </div>
                <p className="text-white/70 dark:text-gray-300">
                  {experience.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex w-full min-h-96 justify-center items-center">
            <FaSpinner className="animate-spin-slow text-secondary text-4xl " />
          </div>
        )}
      </div>
    </div>
  );
}
