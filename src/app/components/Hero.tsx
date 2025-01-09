"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
interface NavBarProps {
  setActiveSection: (section: string) => void;
}
export default function Hero({ setActiveSection }: NavBarProps) {
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <section className="w-full">
      {/* <div
        className="w-full h-[1700px]"
      >
        
        {" "}
      </div> */}
      <div className="relative z-10 px-4 md:px-16 flex flex-col-reverse md:flex-row justify-center items-center w-full md:pl-28 ">
        <motion.div className="mb-10 md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <p className="text-base md:text-lg max-lg:text-xl  space-mono-regular-italic text-left  text-secondary ">
              Hello !!!
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-6xl font-bold mb-4 space-mono-bold-italic text-left">
              Mohamed AbuHamida
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-6 space-mono-regular-italic w-5/6  text-left">
              PROFESSIONAL ML,DL Developer | Front-End Developer
            </p>
          </motion.div>

          <div className="flex justify-center space-x-6 space-mono-regular-italic">
            <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay:0.2 }}
              onClick={() => handleSectionChange("about")}
              className="px-6 py-3 text-base md:text-lg font-semibold bg-primary text-secondary rounded-lg hover:bg-secondary hover:text-primary "
            >
              About Me
            </motion.button>
            <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay:0.4 }}
              onClick={() => handleSectionChange("projects")}
              className="px-6 py-3 text-base md:text-lg  font-semibold bg-transparent border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-secondary  "
            >
              My Projects
            </motion.button>
          </div>
        </motion.div>
        {/* Image Container with Gradient and Border Radius */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto mb-6 w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]  "
          style={{
            // Adjust the size as needed
            borderRadius: "44% 56% 70% 30% / 30% 30% 70% 70%",
            background: "linear-gradient(110deg, #0c1844, #c80036)",
            overflow: "hidden",
          }}
        >
          <img
            src="/me1.png" // Replace with your photo URL
            alt="Mohamed AbuHamida"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
