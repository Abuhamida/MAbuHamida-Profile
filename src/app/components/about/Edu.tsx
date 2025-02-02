"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaAward, FaSpinner } from "react-icons/fa6";
import Image from "next/image";
export default function Edu() {
  const [data, setData] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const getData = async () => {
    try {
      const response = await fetch("/api/edu/get"); // Replace with actual API endpoint
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
    <div className="w-full ">

 {/* Modal */}
 <dialog
        ref={modalRef}
        className="modal "
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


      {data && data.length > 0 ? (
        <ul className="flex gap-10 flex-wrap justify-center items-center w-full">
          {data.map((education, index) => (
            <li
              key={index}
              className="w-80 md:w-96 h-56 flex flex-col justify-center items-stretch shadow-lg shadow-primary/10 p-5 rounded-lg transition-all duration-1000 hover:bg-box-gradient-2 bg-box-gradient-1 "
            >
              <div className="flex flex-col justify-between items-start mb-1">
                <div className="flex w-full justify-between ">
                  <h1 className="text-xl font-semibold text-primary text-left w-full">
                    {education.institution}
                  </h1>
                  <div className="w-full flex flex-col justify-center items-end">
                    <Image
                      src={education.Image_url}
                      alt=""
                      width={500}
                      height={500}
                      className="w-20 cursor-pointer"
                      onClick={() => openModal(education.Image_url)}
                      
                    ></Image>
                  </div>
                </div>

                <span className="text-white/50 dark:text-gray-500 italic">
                  {new Date().getFullYear() <= education.year
                    ? `Expected Year ${education.year} `
                    : education.year}
                </span>
              </div>
              <p className="text-white/70 dark:text-gray-300">
                {education.degree}
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
  );
}
