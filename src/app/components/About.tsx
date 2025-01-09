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
    <section className="w-full py-20">
      <div className="relative z-10 px-4 md:px-24 flex flex-col md:flex-row justify-center items-center w-full">
        <div className="w-full text-center lg:text-left ">
          <h2 className="text-3xl md:text-4xl font-bold text-white/50 dark:text-secondary mb-6">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row w-full justify-center items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className=" w-full text-left md:w-3/4"
            >
              <p className="text-lg text-white/50 dark:text-gray-300 mb-4">
                Hi! I’m Mohamed AbuHamida, a passionate and dedicated developer
                with a strong foundation in Machine Learning, Computer Vision,
                and Front-End Development. My mission is to create user-centric,
                efficient solutions that seamlessly integrate artificial
                intelligence into real-world applications, enhancing both
                functionality and user experience.
              </p>
              <p className="text-lg text-white/50 dark:text-gray-300 mb-4">
                Throughout my journey, I’ve embraced a mindset of curiosity,
                continuous learning, and innovation. With a background in
                Artificial Intelligence and Machine Learning, I specialize in
                developing intelligent systems that not only solve complex
                problems but also add value to everyday life. From crafting
                responsive and visually engaging web interfaces to building
                data-driven models that unlock new possibilities, I strive to
                merge creativity with technical expertise in every project I
                undertake.
              </p>
              <p className="text-lg text-white/50 dark:text-gray-300 mb-4">
                I take pride in my ability to collaborate effectively, whether
                it’s leading a team, working alongside peers, or engaging with
                clients to understand their needs. My approach to development
                emphasizes clean, scalable code, thoughtful design, and a deep
                commitment to staying updated with emerging trends and
                technologies in the ever-evolving tech landscape.
              </p>
              <p className="text-lg text-white/50 dark:text-gray-300 mb-6">
                Looking ahead, I aspire to contribute to groundbreaking projects
                that push the boundaries of technology while fostering a
                positive impact on society. When I’m not coding or experimenting
                with new tools, I enjoy sharing knowledge, participating in
                hackathons, and exploring innovative ideas that inspire
                meaningful change.
              </p>
            </motion.div>
            {/* Call-to-Action */}
            <div className="flex flex-col md:flex-row justify-center lg:justify-start gap-4 w-1/2">
              <div className="flex flex-col justify-center items-center w-full gap-4 md:gap-10">
                <motion.button
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onClick={() => handleSectionChange("projects")}
                  className="px-6 py-3 bg-primary text-secondary rounded-lg hover:bg-secondary hover:text-primary "
                >
                  View Projects
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, delay: 0.4 },
                  }}
                  onClick={() => handleSectionChange("contact")}
                  className="px-6 py-3 border-2 border-primary text-white rounded-lg hover:bg-primary hover:text-secondary "
                >
                  Contact Me
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-primary hover:text-secondary "
                >
                  <a
                    href="/Mohamed-AbuHamida-Resume.pdf"
                    download="Mohamed-AbuHamida-Resume.pdf"
                  >
                    Download CV
                  </a>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
