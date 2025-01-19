"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";
// skillList Component
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
    <div className="w-full flex-col justify-center items-center ">
      {Skills && Skills.length > 0 ? (
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
                      name
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      category
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      percentage
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
              {Skills.map((skill, index) => (
                <tbody key={skill.id}>
                  <tr>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {skill.name}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {skill.category_id == 1 ? "ML" : "Front-End" }
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 w-full">
                        {skill.percentage}
                      </p>
                    </td>

                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <button
                        onClick={() => onEdit(skill)}
                        className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:text-secondary transition-all duration-200"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => onDelete(skill.id)}
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
    <div className="w-full  bg-mainB">
      {Skills && Skills.length > 0 ? (
        <div className="w-full overflow-y-scroll h-[37rem] min-w-[600px]">
          {Skills.map((award) => (
            <div
              key={award.id}
              className="border p-6 rounded-lg shadow-lg mb-6 bg-box-gradient-1"
            >
              <h2 className="text-xl font-semibold mb-2 text-white">
                {award.name}
              </h2>
              <p className="text-sm text-white mb-2">
                <strong>percentage:</strong> {award.percentage}
              </p>
              <p className="text-sm text-white mb-4">
                <strong>category id:</strong> {award.category_id}
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  onClick={() => onEdit(award)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
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
          <FaSpinner className="animate-spin text-secondary text-4xl" />
        </div>
      )}
    </div>
  );
}
