"use client";
import React, { useState } from "react";
import Experience from "./Experience";
import Skills from "./Skills";
import Awards from "./Awards";
import Edu from "./Edu";
import Price from "./Price";
interface NavBarProps {
  setActiveSection: (section: string) => void;
}

export default function About({ setActiveSection }: NavBarProps) {
  const [visibleSection, setVisibleSection] = useState<string | null>("Skills");

  const toggleSection = (section: string) => {
    setVisibleSection(section);
  };

  return (
    <section className="w-full py-20">
      <div className="relative z-10 px-4 md:px-24 flex flex-col justify-center items-center w-full">
        <div className="w-full text-left mb-6 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-10">
          <div className="w-full">
            <h2 className="text-4xl md:text-4xl font-bold text-primary dark:text-secondary mb-3 ">
              About
            </h2>
            <p className="md:text-lg">
              Hi! I'm Mohamed AbuHamida, a passionate AI Engineer with 3 years
              of experience, specializing in Machine Learning, Computer Vision,
              and Front-End Development. My expertise lies in creating
              innovative, user-friendly, and efficient solutions that seamlessly
              bridge the gap between AI and real-world applications.
              <br />
              <br />
              I thrive on transforming complex problems into scalable,
              intelligent solutions that drive business growth. Whether it's
              automating workflows, enhancing decision-making, or optimizing
              operations, I bring AI-driven value to the table.
              <br />
              <br />
              In my career, I’ve worked across multiple sectors—medicine,
              academia, and e-commerce, delivering projects that not only solve
              challenges but also push the boundaries of what's possible with
              AI.
            </p>

            <h1 className="text-4xl md:text-4xl font-bold text-primary dark:text-secondary mt-8 mb-3 ">
            Unique Selling Proposition (USP)
          </h1>
          <p className="md:text-lg ">
            Empowering businesses through AI-driven solutions, I specialize in
            designing and deploying intelligent, scalable applications that make
            advanced AI technologies practical and accessible, turning them into
            tools that automate processes, optimize operations, and drive
            innovation.
          </p>
          </div>
          <div className=" w-2/3 md:w-1/3">
            <div className="flex flex-col justify-between items-center rounded-xl shadow shadow-white/10">
              <button
                className={` px-4 py-5 w-full text-center shadow-white/10 text-secondary shadow-md hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-lg transition-all duration-700 `}
              >
                <a
                  href="/Mohamed-AbuHamida-Resume.pdf"
                  download="Mohamed-AbuHamida-Resume.pdf"
                >
                  Download CV
                </a>
              </button>
              <button
                className={` px-4 py-5  w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-lg transition-all duration-700 `}
                onClick={() => setActiveSection("projects")}
              >
                View Projects
              </button>
              <button
                className={`px-4 py-5  w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-lg transition-all duration-700 `}
                onClick={() => setActiveSection("contact")}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
        {/* <div className="w-full text-start pb-5">
          <h1 className="text-4xl md:text-4xl font-bold text-primary dark:text-secondary ">
            Unique Selling Proposition (USP)
          </h1>
          <p className="md:text-lg w-2/3">
            Empowering businesses through AI-driven solutions, I specialize in
            designing and deploying intelligent, scalable applications that make
            advanced AI technologies practical and accessible, turning them into
            tools that automate processes, optimize operations, and drive
            innovation.
          </p>
        </div> */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-2/3 bg-black/50 rounded-lg h-1"></div>
        </div>
        <div className="w-full py-4">
          <h1 className="text-primary text-4xl font-bold">My Resume</h1>
        </div>

        <div className="flex flex-col md:flex-row w-3/4 justify-between items-center rounded-xl shadow shadow-white/10">
          <button
            className={`${
              visibleSection === "Skills"
                ? "shadow-white/10 text-secondary shadow-md"
                : ""
            } px-4 py-5  w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-xl transition-all duration-700 `}
            onClick={() => toggleSection("Skills")}
          >
            Skills
          </button>
          <button
            className={`${
              visibleSection === "education"
                ? "shadow-white/10 text-secondary shadow-md"
                : ""
            } px-4 py-5  w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-xl transition-all duration-700 `}
            onClick={() => toggleSection("education")}
          >
            Education
          </button>
          <button
            className={`${
              visibleSection === "experience"
                ? "shadow-white/10 text-secondary shadow-md"
                : ""
            } px-4 py-5  w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-xl transition-all duration-700 `}
            onClick={() => toggleSection("experience")}
          >
            Experience
          </button>
          <button
            className={`${
              visibleSection === "awards"
                ? "shadow-white/10 text-secondary shadow-md"
                : ""
            } px-4 py-5  w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-xl transition-all duration-700 `}
            onClick={() => toggleSection("awards")}
          >
            Awards
          </button>
        </div>

        <div className="w-full min-h-96 my-12 flex flex-col justify-center items-center">
          <div className="w-full"></div>
          {visibleSection === "Skills" && <Skills />}
          {visibleSection === "education" && <Edu />}
          {visibleSection === "experience" && <Experience />}
          {visibleSection === "awards" && <Awards />}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-2/3 bg-black/50 rounded-lg h-1"></div>
      </div>

      <div className="mt-10">
        <Price setActiveSection={setActiveSection} />
      </div>
    </section>
  );
}
