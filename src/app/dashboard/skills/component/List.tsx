"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";
// ProjectList Component
export default function List({
  Skills,
  onEdit,
  onDelete,
}: {
  Skills: {
    id: string;
    name: string;
    category_id: number;
    percentage: number;
  }[];
  onEdit: (award: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full min-w-[600px]">
      {Skills && Skills.length > 0 ? (
        <div className="w-full overflow-y-scroll h-[37rem] min-w-[600px]">
          {Skills.map((award) => (
            <div key={award.id} className="border p-4 rounded shadow-sm mb-4">
              <h2 className="text-xl font-semibold mb-2">{award.name}</h2>
              <p className="text-sm text-gray-700 mb-2">
                <strong>percentage:</strong> {award.percentage}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>category id:</strong> {award.category_id}
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => onEdit(award)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => onDelete(award.id)}
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

