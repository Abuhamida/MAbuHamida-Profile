"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";

// List Component
export default function List({
  awards,
  onEdit,
  onDelete,
}: {
  awards: {
    id: string;
    title: string;
    description: string;
    year: number;
    Image_url: string;
  }[];
  onEdit: (award: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full flex-col justify-center items-center ">
      {awards && awards.length > 0 ? (
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
                      Title
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      Description
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      Year
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      Image Url
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
              {awards.map((awards, index) => (
                <tbody key={awards.id}>
                  <tr>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {awards.title}
                      </p>
                    </td>

                    <td className="p-4 border-b border-r border-blue-gray-50 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 w-full">
                        {awards.description}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 w-full">
                        {awards.year}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 w-full">
                        {awards.Image_url}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <button
                        onClick={() => onEdit(awards)}
                        className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:text-secondary transition-all duration-200"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => onDelete(awards.id)}
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

  // return (
  //   <div className="w-full">
  //     {awards && awards.length > 0 ? (
  //       <div className="w-full overflow-y-scroll h-[37rem] mt-10 md:mt-0 md:min-w-[600px] bg-mainB rounded-md">
  //         {awards.map((award) => (
  //           <div key={award.id} className="border p-4 rounded-lg shadow-md mb-4 bg-box-gradient-2 text-white">
  //             <h2 className="text-xl font-semibold mb-2">{award.title}</h2>
  //             <p className="text-sm mb-2">
  //               <strong>Year:</strong> {award.year}
  //             </p>
  //             <p className="text-sm mb-4">
  //               <strong>Description:</strong> {award.description}
  //             </p>
  //             <div className="flex justify-between">
  //               <button
  //                 className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-secondary transition-colors duration-200"
  //                 onClick={() => onEdit(award)}
  //               >
  //                 Edit
  //               </button>
  //               <button
  //                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transition-colors duration-200"
  //                 onClick={() => onDelete(award.id)}
  //               >
  //                 Delete
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <div className="flex w-full min-h-screen justify-center items-center">
  //         <FaSpinner className="animate-spin text-secondary text-4xl" />
  //       </div>
  //     )}
  //   </div>
  // );
}
