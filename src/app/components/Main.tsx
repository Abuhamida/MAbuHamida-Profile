"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface NavBarProps {
  setActiveSection: (section: string) => void;
}

export default function Main2({ setActiveSection }: NavBarProps) {
  return (
    <section className="relative bg-cover bg-center w-full  flex flex-col text-center text-white -z-50 pb-0   min-h-screen overflow-hidden ">
      <div
        className=" relative  min-h-screen w-full flex flex-col justify-center items-center "
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
          className="w-72 h-[37rem] absolute bottom-10 md:bottom-0 md:w-[400px] md:h-[700px] z-10 pt-10 select-none "
        />

        <div className="w-full absolute top-64 md:top-1/4 ">
          <Image
            src={"/GRAMM.png"}
            alt="GRAMM"
            width={3000}
            height={3000}
            className="w-full  opacity-40 select-none "
          />
        </div>
        <div className=" absolute bottom-20 md:bottom-5 z-50 text-center w-full flex flex-col justify-center items-center  ">
          <div className=" relative w-full flex flex-col justify-center items-center pb-5 md:pb-0">
            {/* <div className="flex justify-center md:justify-around items-center gap-5 md:gap-2 w-full md:w-[35%]">
              <h1 className="text-4xl md:text-7xl pinyon-script-regular">
                Mohamed{" "}
              </h1>
              <h2 className="text-secondary text-[8px] md:text-base mt-3">
                Front-End Developer
              </h2>
            </div>
            <div className="flex justify-between items-center gap-2 md:w-[35%]">
              <h2 className="text-secondary text-[8px] md:text-base mt-3">
                PROFESSIONAL ML,DL Developer
              </h2>
              <h1 className="text-4xl md:text-7xl pinyon-script-regular">
                Ramadan
              </h1>
            </div> */}
            <Image
              src={"/name.png"}
              alt="name "
              height={1000}
              width={1000}
              className="h-32 md:h-56 w-[19rem] md:w-[37rem] select-none"
            />
          </div>

          <div className="w-full text-center text-[7px] md:text-base  flex flex-col justify-center items-center ">
            <p className="w-[19rem] md:w-[37rem] text-center ">
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
      <div className=" relative flex flex-col justify-center items-center min-h-10 w-full bg-black z-50 -mt-10 md:mt-0 md:py-5 mb-16">
        <div className="flex justify-center space-x-6 space-mono-regular-italic z-50">
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveSection("about")}
            className="px-6 py-3 text-base md:text-lg font-semibold bg-primary text-secondary rounded-lg hover:bg-secondary hover:text-primary "
          >
            About Me
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
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
