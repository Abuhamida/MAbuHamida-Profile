"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaAward, FaSpinner } from "react-icons/fa6";
import Image from "next/image";

export default function Awards() {
  const [data, setData] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const getData = async () => {
    try {
      const response = await fetch("/api/awards/get");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching awards:", error);
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
    <div className="p-4 md:p-6 overflow-hidden">
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

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-secondary flex items-center gap-2">
        <FaAward />
        My Awards
      </h1>

      {/* Awards List */}
      {data.length > 0 ? (
        <div className="flex gap-10 flex-wrap justify-center items-center w-full">
          {data.map((award, index) => (
            <div
              key={index}
              className="w-80 md:w-96 h-72 flex flex-col justify-center items-stretch shadow-lg shadow-primary/10 p-5 rounded-lg transition-all duration-300 hover:bg-box-gradient-2 bg-box-gradient-1"
            >
              <h2 className="text-xl font-semibold text-primary text-left">
                {award.title}
              </h2>
              <div className="overflow-hidden w-full h-2/3 flex flex-col justify-center items-center">
                <Image
                  src={award.Image_url}
                  alt={award.title || "Award Image"}
                  width={150}
                  height={150}
                  loading="lazy"
                  className="cursor-pointer rounded-md hover:scale-105 transition-transform"
                  onClick={() => openModal(award.Image_url)}
                />
              </div>

              <p className="text-sm text-gray-400">{award.description}</p>
              <span className="text-xs text-gray-500">{award.year}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full min-h-96 justify-center items-center">
          <FaSpinner className="animate-spin text-secondary text-4xl" />
        </div>
      )}
    </div>
  );
}
