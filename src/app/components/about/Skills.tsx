"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

export default function Skills() {
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<Record<number, string>>({
    1: "ML Skills",
    2: "Front-End Skills",
  });

  const getData = async () => {
    try {
      const response = await fetch("/api/skills/get"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const skills = await response.json();
      setData(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full gap-10 min-h-96">
      {data && data.length > 0 ? (
        Object.keys(categories).map((categoryId) => {
          const filteredSkills = data.filter(
            (skill) => skill.category_id === Number(categoryId)
          );

          return (
            <div key={categoryId} className="w-full">
              <h3 className="text-xl text-left font-semibold text-primary mb-4">
                {categories[Number(categoryId)]}
              </h3>
              <ul>
                {filteredSkills.map((skill, index) => (
                  <li key={skill.id} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white/70 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-white/70 dark:text-gray-300">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[#191919] rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ x: -100 }}
                        animate={{
                          x: 0,
                          transition: { duration: 0.6, delay: 0.1 * index },
                        }}
                        className="bg-fixed-gradient h-2 rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      ></motion.div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      ) : (
        <div className="flex w-full min-h-96 justify-center items-center">
          <FaSpinner className="animate-spin-slow text-secondary text-4xl" />
        </div>
      )}
    </div>
  );
}
