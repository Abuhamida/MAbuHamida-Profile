import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  image: string;
  description?: string;
  details?: string;
  features?: string[];
  technologies?: string[];
  link?: string;
  section: string[];
  love: number;
  [key: string]: any; // Allow for additional properties
}

interface ProjectProps {
  params: { project: Project | null };
  setIsProject: (value: boolean) => void;
}

export default function Project({ params, setIsProject }: ProjectProps) {
  const { project } = params;

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <button
          className="text-primary hover:text-secondary border border-secondary px-4 py-2 rounded-lg"
          onClick={() => setIsProject(false)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 min-h-screen w-full flex flex-col justify-center items-center bg-transparent text-left text-primary pt-10 md:pt-0">
      <div className="w-full md:w-3/4">
        {/* Header with Back Button */}
        <div className="flex justify-between md:justify-center items-center">
          <button
            className="text-2xl text-primary p-3 shadow-primary hover:shadow-secondary shadow rounded-full font-bold hover:text-secondary"
            onClick={() => setIsProject(false)}
            aria-label="Go Back"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-primary text-center w-2/3 md:w-full mb-4">
            {project.title}
          </h1>
        </div>

        {/* Project Image */}
        <img
          src={project.image}
          alt={`Image of ${project.title}`}
          className="w-full h-80 object-cover mt-4 rounded-lg"
        />

        {/* Project Description */}
        {project.description && <p className="mt-4">{project.description}</p>}

        {/* Project Details */}
        {project.details && (
          <>
            <h2 className="mt-8 text-2xl font-semibold text-secondary">
              Details
            </h2>
            <p className="mt-2 text-primary">{project.details}</p>
          </>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <>
            <h2 className="mt-8 text-2xl font-semibold text-secondary">
              Features
            </h2>
            <ul className="list-disc list-inside mt-2 text-primary">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {/* Technologies Used */}
        {project.technologies && project.technologies.length > 0 && (
          <>
            <h2 className="mt-8 text-2xl font-semibold text-secondary">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-secondary px-3 py-1 rounded-full text-sm text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}

        {/* GitHub Link */}
        {project.link && (
          <div className="flex flex-col justify-center items-center">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-8 text-center hover:bg-secondary text-white px-4 py-2 rounded-lg border-secondary border transition-colors duration-200"
            >
              View on GitHub
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
