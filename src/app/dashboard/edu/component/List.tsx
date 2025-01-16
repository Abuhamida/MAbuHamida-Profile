"use client";
import { time } from "console";
import React from "react";
import { FaSpinner } from "react-icons/fa";

// List Component
export default function List({
  edu,
  onEdit,
  onDelete,
}: {
  edu: {
    id: string;
    institution: string;
    degree: string;
    year: number;
  }[];
  onEdit: (award: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full">
      {edu && edu.length > 0 ? (
        <div className="w-full overflow-y-scroll h-[37rem] min-h-96 min-w-[600px]">
          {edu.map((edu) => (
            <div key={edu.id} className="border p-4 rounded shadow-sm mb-4">
              <h2 className="text-xl font-semibold mb-2">{edu.institution}</h2>
              <p className="text-sm text-gray-700 mb-2">
                {new Date().getFullYear() <= edu.year ? (
                  <span>
                    <strong>Expected Year:</strong> {edu.year}
                  </span>
                ) : (
                  <span>
                    <strong>Year:</strong> {edu.year}
                  </span>
                )}
              </p>

              <p className="text-sm text-gray-700 mb-4">
                <strong>Description:</strong> {edu.degree}
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => onEdit(edu)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => onDelete(edu.id)}
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
