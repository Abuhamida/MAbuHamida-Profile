"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaAward, FaSpinner } from "react-icons/fa6";
import Image from "next/image";

export default function Experience() {
  const [data, setData] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

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

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    modalRef.current?.showModal();
  };

  return (
    <div>
      {/* Modal */}
      <dialog
        ref={modalRef}
        className="modal"
        onClick={(e) => {
          if (e.target === modalRef.current) {
            modalRef.current?.close();
          }
        }}
      >
        <div className="modal-box flex flex-col items-center bg-box-gradient-1">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Award Image"
              width={500}
              height={500}
              className="rounded-lg "
            />
          )}
        </div>
      </dialog>

      <div className="w-full">
        {data && data.length > 0 ? (
          <ul className="flex gap-10 flex-wrap justify-center items-center w-full">
            {data.map((experience, index) => (
              <li
                key={index}
                className="w-80 md:w-96 h-72 flex flex-col justify-between  items-stretch gap-5  shadow-lg shadow-primary/10 p-5 rounded-lg transition-all duration-1000 hover:bg-box-gradient-2 bg-box-gradient-1 "
              >
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-xl font-semibold text-primary text-left">
                    {experience.role} at {experience.company}
                  </h1>
                  <h1 className="text-white/50 dark:text-gray-500 italic">
                    {experience.year}
                  </h1>
                </div>

                <div className="overflow-hidden w-full h-2/3 flex flex-col justify-center items-center">
                  <Image
                    src={experience.Image_url}
                    alt={experience.title || "experience Image"}
                    width={150}
                    height={150}
                    loading="lazy"
                    className="cursor-pointer rounded-md hover:scale-105 transition-transform"
                    onClick={() => openModal(experience.Image_url)}
                  />
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
