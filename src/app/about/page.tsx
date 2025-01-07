"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
export default function page() {
  return (
    <section
      className="relative bg-cover bg-center  h-full flex flex-col items-center justify-center text-center text-white -z-10 pb-24 pt-20"
      style={{
        backgroundImage: "url('/mainbg.png')",
        backgroundAttachment: "fixed", // Fixes the background position
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the background image
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
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
            <Link
              href="projects"
              className="px-6 py-3 bg-primary text-white/50 rounded-lg hover:bg-secondary transition"
            >
              View Projects
            </Link>
            <Link
              href="contact"
              className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white/50 transition"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
        {/* Image Container with Gradient and Border Radius */}
      </motion.div>
    </section>
  );
}
