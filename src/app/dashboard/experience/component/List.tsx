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
    id: string;
    role: string;
    company: string;
    year: number;
    description: string;
    Image_url: string;
  }[];
  onEdit: (award: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full flex-col justify-center items-center ">
      {Experience && Experience.length > 0 ? (
        <div className="w-full flex-col justify-center items-center  ">
          <div className="relative flex flex-col w-full h-full overflow-x-scroll text-primary bg-transparent shadow-md rounded-xl bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      ID
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Role
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Company
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      Description
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      Image URL
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Year
                    </p>
                  </th>

                  <th className="p-4 border-b border-r  w-20 border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                  </th>
                  <th className="p-4 border-b w-20 border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                  </th>
                </tr>
              </thead>
              {Experience.map((experience, index) => (
                <tbody key={experience.id}>
                  <tr>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {experience.role}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {experience.company}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {experience.description}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {experience.Image_url}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 w-full">
                        {experience.year}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <button
                        onClick={() => onEdit(experience)}
                        className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:text-secondary transition-all duration-200"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => onDelete(experience.id)}
                        className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:text-secondary transition-all duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      ) : (
        <div className="flex w-full min-h-screen justify-center items-center">
          <FaSpinner className="animate-spin-slow text-secondary text-4xl" />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {Experience && Experience.length > 0 ? (
        <div className="w-full overflow-y-scroll h-[37rem] min-h-96">
          {Experience.map((Experience) => (
            <div
              key={Experience.id}
              className="border p-4 rounded shadow-sm mb-4"
            >
              <h2 className="text-xl font-semibold mb-2">
                {Experience.role} at {Experience.company}
              </h2>
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
