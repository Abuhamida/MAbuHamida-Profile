"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaAws, FaGitAlt } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import {
  SiTypescript,
  SiJavascript,
  SiTensorflow,
  SiPytorch,
  SiLinux,
} from "react-icons/si";

interface NavBarProps {
  setActiveSection: (section: string) => void;
}
export default function Skills({ setActiveSection }: NavBarProps) {
  const skills = [
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "#F7DF1E",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "#3178C6",
    },
    {
      name: "React",
      icon: FaReact,
      color: "#61DAFB",
    },
    {
      name: "Node.js",
      icon: FaNodeJs,
      color: "#68A063",
    },
    {
      name: "Python",
      icon: FaPython,
      color: "#3776AB",
    },
    {
      name: "TensorFlow",
      icon: SiTensorflow,
      color: "#FF6F00",
    },
    {
      name: "PyTorch",
      icon: SiPytorch,
      color: "#EE4C2C",
    },
    {
      name: "Azure",
      icon: VscAzure,
      color: "#31ace4",
    },
    {
      name: "Linux",
      icon: SiLinux,
      color: "#FCC624",
    },
    {
      name: "Git",
      icon: FaGitAlt,
      color: "#F05032",
    },
  ];

  return (
    <section
      id="skills"
      className="flex w-full flex-col items-center justify-center  text-white px-6 py-20"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        My Skills
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-center mb-12 max-w-lg"
      >
        Here are some of the technologies and tools I specialize in, spanning
        web development, AI, machine learning, and DevOps.
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-4xl">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 ,transition:{duration:0.6,delay:index*0.2} } }
            whileHover={{scale:1.1,transition:{duration:0.2}}}
            className="flex flex-col items-center bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-4 shadow-lg hover:scale-105   "
          >
            <skill.icon
              className="text-5xl mb-4"
              style={{ color: skill.color }}
            />
            <h3 className="text-lg font-semibold">{skill.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
