import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import Project from "@/app/components/Project";
import { FaSpinner } from "react-icons/fa";

interface NavBarProps {
  setActiveSection: (section: string) => void;
}

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
}

export default function Projects({ setActiveSection }: NavBarProps) {
  const [isProject, setIsProject] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleSection, setVisibleSection] = useState("all");

  const handelProjectView = (project: Project) => {
    setProject(project);
    setIsProject(true);
  };

  const getProjects = async () => {
    try {
      const response = await fetch("/api/Projects/getProjects"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handelLove = (projectId: string) => {
    const lovedProject = localStorage.getItem("lovedProject");

    if (lovedProject === projectId) {
      localStorage.removeItem("lovedProject");
      const updatedProjects = projects.map((project) =>
        project.id === projectId
          ? { ...project, love: project.love - 1 }
          : project
      );
      setProjects(updatedProjects);
      return;
    }

    localStorage.setItem("lovedProject", projectId);
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, love: project.love + 1 }
        : project
    );
    setProjects(updatedProjects);
  };

  // Extract unique sections
  const sections = Array.from(
    new Set(projects.flatMap((project) => project.section))
  );

  // Filtered projects based on visibleSection
  const filteredProjects =
    visibleSection === "all"
      ? projects
      : projects.filter((project) => project.section.includes(visibleSection));

  return (
    <section
      id="projects"
      className={`flex w-full flex-col items-center justify-center ${
        isProject ? "pt-0 pb-20" : "p-0"
      }px-0 md:px-6`}
    >
      {isProject ? (
        <div className="w-full relative flex flex-col justify-center items-center pb-20 pt-10">
          <div className="w-full bg-transparent">
            <Project
              params={{ project: (project || null) as Project | null }}
              setIsProject={setIsProject}
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center py-20 md:pt-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            My Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-center mb-3 max-w-lg text-secondary w-11/12"
          >
            Visit my portfolio and keep your feedback
          </motion.p>
           {/* Dropdown for small screens */}
           <div className="md:hidden w-2/3 mb-6">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  Select Project Type
                </span>
              </div>
              <select className="select border border-secondary bg-transparent">
                <option value="all">All</option>
                {sections.map((section, index) => (
                  <option key={index} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </label>
            
          </div>

          {/* Buttons for larger screens */}
          <div className="hidden md:block w-2/3 mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center rounded-xl shadow shadow-white/10">
              <button
                className={`${
                  visibleSection === "all"
                    ? "shadow-white/10 text-secondary shadow-md"
                    : ""
                } px-4 py-5 w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-lg transition-all duration-700`}
                onClick={() => setVisibleSection("all")}
              >
                All
              </button>

              {sections.map((section, index) => (
                <button
                  key={index}
                  className={`${
                    visibleSection === section
                      ? "shadow-white/10 text-secondary shadow-md"
                      : ""
                  } px-4 py-5 w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-lg transition-all duration-700`}
                  onClick={() => setVisibleSection(section)}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
          {filteredProjects && filteredProjects.length > 0 ? (
            <div className="flex flex-wrap gap-10 w-full justify-center items-center">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{
                    opacity: 0,
                    y: 50,
                    background:
                      "linear-gradient(90deg, rgba(35,35,35,1) 21%, rgba(25,25,25,1) 99%)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.3 },
                  }}
                  whileHover={{
                    background:
                      "linear-gradient(20deg, rgba(20,20,20,1) 21%, rgba(35,35,35,1) 99%)",
                    transition: { duration: 0.4 },
                  }}
                  className="bg-[#2f2f2f] rounded-lg shadow-lg overflow-hidden w-96 h-96 p-5 group  grayscale-[0.5] hover:grayscale-0 mx-3 md:mx-0"
                >
                  <div className="flex flex-col gap-3 justify-center items-center">
                    <div className="bg-cover max-w-11/12 overflow-hidden rounded-xl shadow-xl">
                      <Image
                        src={project.image}
                        alt=""
                        width={500}
                        height={500}
                        className="max-w-11/12 h-56 object-cover rounded-lg group-hover:scale-110 duration-300 cursor-pointer"
                        onClick={() => handelProjectView(project)}
                      />
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <div className="flex items-center justify-center">
                        {project.section.map((item: string, index: number) => (
                          <h1 key={index}>
                            {item}
                            {index < project.section.length - 1 ? "," : ""}
                          </h1>
                        ))}
                      </div>
                      <div
                        className="cursor-pointer flex justify-center items-center group/heart gap-1 hover:bg-black/20 rounded-lg hover:scale-90 py-1 px-2"
                        onClick={() => handelLove(project.id)}
                      >
                        <CiHeart className="text-xl group-hover/heart:text-secondary" />
                        <h1 className="text-base">{project.love}</h1>
                      </div>
                    </div>
                    <div className="w-full text-xl md:text-2xl flex items-start flex-col justify-center h-10 mt-2 text-left hover:text-secondary transition-colors duration-500 group/item">
                      <button
                        className="font-bold group/item text-start"
                        onClick={() => handelProjectView(project)}
                      >
                        {project.title}
                        <span className="text-transparent group-hover/item:text-secondary transition-colors duration-300 ml-1">
                          ↗
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex w-full min-h-96 justify-center items-center">
              <FaSpinner className="animate-spin-slow text-secondary text-4xl " />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
