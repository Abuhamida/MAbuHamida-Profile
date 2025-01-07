"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
interface NavBarProps {
  setActiveSection: (section: string) => void;
}
export default function Projects({ setActiveSection }: NavBarProps) {
  const projects = [
    {
      title: "Smart Shopping Cart",
      description:
        "An AI-powered shopping cart solution using computer vision and IoT for real-time item recognition and seamless checkout.",
      image: "/smartCart.jpg",
      link: "https://github.com/Abuhamida/Smart-Shopping-Cart",
      technologies: ["Python", "IoT", "React", "Computer Vision"],
    },
    {
      title: "Medicare EHR System",
      description:
        "An AI-integrated Electronic Health Record system to assist in diagnosis, coupled with IoT device monitoring.",
      image: "/medicare.png",
      link: "https://github.com/Abuhamida/medicare_predection",
      technologies: ["AI", "IoT", "Next.js", "Node.js"],
    },
    {
      title: "Asteroid Hazard Prediction",
      description:
        "A machine learning model using NASA's dataset to predict asteroid hazards with 97% accuracy.",
      image: "/asteroid-prediction.png",
      link: "https://github.com/Abuhamida/asteroid-hazard-prediction",
      technologies: ["Python", "Random Forest", "Gradio"],
    },
    {
      title: "Customer Segmentation Analysis",
      description:
        "Data analysis and clustering project to identify e-commerce customer segments and behavioral insights.",
      image: "/customer-segmentation.png",
      link: "https://github.com/Abuhamida/E-commerce-Customer-Segmentation",
      technologies: ["Python", "K-Means", "Power BI"],
    },
    {
      title: "Mining Process Flotation Plant Analysis",
      description:
        "A comprehensive analysis of flotation plant data using EDA and a Random Forest model for accurate predictions. Deployed using Gradio and visualized with Power BI.",
      image: "/mining-process.png",
      link: "https://github.com/Abuhamida/Quality-Prediction-in-a-Mining-Process",
      technologies: ["Python", "Random Forest", "Gradio", "Power BI"],
    },
  ];

  return (
    <section
      id="projects"
      className="flex w-full flex-col items-center justify-center  text-white px-6 "
    >
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
        className="text-lg text-center mb-12 max-w-lg"
      >
        A showcase of some of the exciting projects I have worked on, blending
        creativity with cutting-edge technologies.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-primary">
                {project.title}
              </h3>
              <p className="text-primary/80 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full px-3 py-1 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={project.link}
                className="text-primary dark:text-secondary hover:underline"
              >
                View Project &rarr;
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
