"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface NavBarProps {
  setActiveSection: (section: string) => void;
}

export default function Page({ setActiveSection }: NavBarProps) {
  return (
    <section className="relative bg-cover bg-center  flex flex-col text-center text-white -z-10 pb-0   min-h-screen overflow-hidden ">
      <div
        className=" relative  min-h-96 md:min-h-screen w-full flex flex-col justify-center items-center "
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(50,50,50,1) 50%, rgba(139,139,139,1) 100%)",
        }}
      >
        <Image
          src={"/me0.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-56 h-96 absolute bottom-0 md:w-[400px] md:h-[700px] z-10 pt-10 "
        />

        <div className=" absolute top-32 -left-7 md:-left-24 w-full text-8xl md:text-[25rem]   font-bold text-left text-[#d8d8d8] opacity-50 object-cover ">
          <h1 className="-z-50">GRAMM</h1>
        </div>
        <div className=" absolute bottom-5 z-50 text-center w-full flex flex-col justify-center items-center ">
          <div className=" relative w-full flex flex-col justify-center items-center">
            <div className="flex justify-around items-center gap-2 w-[35%]">
              <h1 className="text-7xl pinyon-script-regular">Mohamed </h1>
              <h2 className="text-secondary text-base mt-3">
                Front-End Developer
              </h2>
            </div>
            <div className="flex justify-between items-center gap-2 w-[35%]">
              <h2 className="text-secondary text-base mt-3">
                PROFESSIONAL ML,DL Developer
              </h2>
              <h1 className="text-7xl pinyon-script-regular">Ramadan</h1>
            </div>
          </div>

          <div className="w-full text-center text-base  flex flex-col justify-center items-center ">
            <p className="md:w-[37rem] text-center ">
              Hi! I'm Mohamed AbuHamida, a passionate developer with expertise
              in Machine Learning, Computer Vision, and Front-End Development. I
              strive to create user-friendly and efficient
            </p>
            <h1>
              <span className="text-secondary">
                solutions that bridge the gap between AI and real-world
                application
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className=" relative flex flex-col justify-center items-center min-h-10 w-full bg-black z-50 py-5">
        <div className="flex justify-center space-x-6 space-mono-regular-italic z-50">
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            onClick={() => setActiveSection("about")}
            className="px-6 py-3 text-base md:text-lg font-semibold bg-primary text-secondary rounded-lg hover:bg-secondary hover:text-primary "
          >
            About Me
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            onClick={() => setActiveSection("projects")}
            className="px-6 py-3 text-base md:text-lg  font-semibold bg-transparent border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-secondary  "
          >
            My Projects
          </motion.button>
        </div>
      </div>
    </section>
  );
}
