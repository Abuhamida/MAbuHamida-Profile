"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";
// ProjectList Component
export default function ProjectList({
  projects,
  onEdit,
  onDelete,
}: {
  projects: any[];
  onEdit: (project: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full ">
      {projects && projects.length > 0 ? (
        <div className="w-full overflow-y-scroll h-[37rem]">
          {projects.map((project) => (
            <div key={project.id} className="border p-4 rounded shadow-sm">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-sm text-gray-700 mb-2">
                <strong>ID:</strong> {project.id}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Sections:</strong> {project.section.join(", ")}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Description:</strong> {project.description}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Features:</strong>
              </p>
              <ul className="list-disc ml-6 mb-2 text-gray-700">
                {project.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Details:</strong> {project.details}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Love Count:</strong> {project.love}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>GitHub Link:</strong>{" "}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Repository
                </a>
              </p>
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
