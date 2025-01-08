"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
interface NavBarProps {
  setActiveSection: (section: string) => void;
}
export default function About({ setActiveSection }: NavBarProps) {
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <section className="w-full">
      <motion.div
        className="relative z-10 px-4 md:px-16 flex flex-col md:flex-row justify-center items-center w-full"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="mx-auto mb-6 w-[200px] h-[250px] md:w-[250px] md:h-[300px] lg:w-[300px] lg:h-[400px] border rounded-md flex justify-center items-center  ">
          <Image
            src="/me2.png"
            width={1000}
            height={1000}
            alt="Mohamed AbuHamida"
            className="object-cover w-full h-full "
          />
        </div>
        {/* Right: Content */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left "
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white/50 dark:text-secondary mb-6">
            About Me
          </h2>
          <p className="text-lg text-white/50 dark:text-gray-300 mb-4">
            Hi! I’m Mohamed AbuHamida, a passionate developer with expertise in
            Machine Learning, Computer Vision, and Front-End Development. I
            strive to create user-friendly and efficient solutions that bridge
            the gap between AI and real-world applications.
          </p>
          <p className="text-lg text-white/50 dark:text-gray-300 mb-6">
            My journey has been a blend of curiosity, learning, and innovation.
            I aim to combine my technical skills with creativity to deliver
            impactful projects.
          </p>

          {/* Call-to-Action */}
          <div className="flex justify-center lg:justify-start gap-4">
            <button
              onClick={() => handleSectionChange("projects")}
              className="px-6 py-3 bg-primary text-white/50 rounded-lg hover:bg-secondary transition"
            >
              View Projects
            </button>
            <button
              onClick={() => handleSectionChange("contact")}
              className="px-6 py-3 border-2 border-primary text-white/50 rounded-lg hover:bg-primary hover:text-white/50 transition"
            >
              Contact Me
            </button>
            <a
              href="/Mohamed-AbuHamida-Resume.pdf"
              download="Mohamed-AbuHamida-Resume.pdf"
              className="px-6 py-3 bg-secondary text-white/50 rounded-lg hover:bg-primary hover:text-white/50 transition"
            >
              Download CV
            </a>
          </div>
        </motion.div>
        {/* Image Container with Gradient and Border Radius */}
      </motion.div>
    </section>
  );
}
