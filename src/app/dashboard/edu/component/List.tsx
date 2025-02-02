"use client";
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
    Image_url : string;
  }[];
  onEdit: (award: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full flex-col justify-center items-center ">
      {edu && edu.length > 0 ? (
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
                    institution
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      degree
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      year
                    </p>
                  </th>
                  <th className="p-4 border-b border-r border-blue-gray-100 bg-blue-gray-50 overflow-clip">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                      Image URL
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
              {edu.map((edu,index) => (
                <tbody key={edu.id}>
                  <tr>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index+1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {edu.institution}
                      </p>
                    </td>

                    <td className="p-4 border-b border-r border-blue-gray-50 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 w-full">
                        {edu.degree}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {edu.year}
                      </p>
                    </td>
                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {edu.Image_url}
                      </p>
                    </td>

                    <td className="p-4 border-b border-r border-blue-gray-50">
                      <button
                        onClick={() => onEdit(edu)}
                        className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:text-secondary transition-all duration-200"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => onDelete(edu.id)}
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
      {edu && edu.length > 0 ? (
        <div className="w-full overflow-y-scroll h-[37rem] min-h-96 min-w-[600px]  rounded-lg p-5">
          {edu.map((edu) => (
            <div
              key={edu.id}
              className="border border-gray-700 p-4 rounded-xl shadow-md bg-[#2D2D2D] mb-4 transition-transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {edu.institution}
              </h2>
              <p className="text-sm text-[#E5E5E5] mb-2">
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

              <p className="text-sm text-[#E5E5E5] mb-4">
                <strong>Description:</strong> {edu.degree}
              </p>
              <div className="flex justify-between items-center">
                <button
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-[#c80036] transition-colors"
                  onClick={() => onEdit(edu)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
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
          <FaSpinner className="animate-spin text-secondary text-4xl" />
        </div>
      )}
    </div>
  );
}
