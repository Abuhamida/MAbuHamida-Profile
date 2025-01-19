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
    <div className="w-full flex-col justify-center items-center ">
      {Services && Services.length > 0 ? (
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
                      Name
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Category
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      Description
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Price
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Discount
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Features
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      delivery
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Revision
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
              {Services.map((Service, index) => (
                <tbody key={index}>
                  <tr>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {Service.name}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {Service.category}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 w-full">
                        {Service.description}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {Service.price}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {Service.discount}
                      </p>
                    </td>

                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {Service.features.join(", ")}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {Service.delivery}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {Service.revision}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <button
                        onClick={() => onEdit(Service)}
                        className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:text-secondary transition-all duration-200"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => onDelete(Service.id)}
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
}
