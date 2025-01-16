"use client";
import { time } from "console";
import React from "react";
import { FaSpinner } from "react-icons/fa";

// List Component
export default function List({
  Experience,
  onEdit,
  onDelete,
}: {
  Experience: {
    id: string; // Ensure id is always a string
    role: string;
    company: string;
    year: number;
    description: string;
  }[];
  onEdit: (award: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full">
      {Experience && Experience.length > 0 ? (
        <div className="w-full overflow-y-scroll h-[37rem] min-h-96 min-w-[600px]">
          {Experience.map((Experience) => (
            <div
              key={Experience.id}
              className="border p-4 rounded shadow-sm mb-4"
            >
              <h2 className="text-xl font-semibold mb-2">{Experience.role} at {Experience.company}</h2>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Year:</strong> {Experience.year}
              </p>

              <p className="text-sm text-gray-700 mb-4">
                <strong>Description:</strong> {Experience.description}
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => onEdit(Experience)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => onDelete(Experience.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full min-h-screen justify-center items-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        </div>
      )}
    </div>
  );
}
