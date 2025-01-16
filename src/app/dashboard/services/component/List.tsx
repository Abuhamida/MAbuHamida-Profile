"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";

// ProjectList Component
export default function List({
  Services,
  onEdit,
  onDelete,
}: {
  Services: any[];
  onEdit: (project: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full min-w-[600px]">
      {Services && Services.length > 0 ? (
        <div className="w-full overflow-y-scroll h-[37rem]">
          {Services.map((project) => (
            <div key={project.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-sm text-gray-700 mb-2">
                <strong>ID:</strong> {project.id}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Category:</strong> {project.category}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Description:</strong> {project.description}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Price:</strong> ${project.price}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Discount:</strong> {project.discount}%
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Delivery Time:</strong> {project.delivery} Days
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Revisions:</strong> {project.revision} Revisions
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Features:</strong>
              </p>
              <ul className="list-disc ml-6 mb-2 text-gray-700">
                {project.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => onEdit(project)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => onDelete(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full min-h-screen justify-center items-center">
          <FaSpinner className="animate-spin-slow text-blue-500 text-4xl transition-all duration-700" />
        </div>
      )}
    </div>
  );
}
