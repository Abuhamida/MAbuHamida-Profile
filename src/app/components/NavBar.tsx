"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
interface NavBarProps {
  setActiveSection: (section: string) => void;
}

export default function NavBar({ setActiveSection }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (isMenuOpen) toggleMenu(); // Close the menu on mobile
  };

  return (
    <header className="bg-opacity-10 backdrop-blur-lg fixed w-full top-0 shadow-lg dark:bg-[#171717] space-mono-bold z-50">
      <nav className="flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">
          <Link href={"/"} onClick={() => handleSectionChange("hero")}>
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={30}
              height={30}
              className=" md:w-8"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-yellow-50 dark:text-white text-lg lg:text-xl">
          {["about", "projects", "skills", "contact"].map((section) => (
            <motion.li
              key={section}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => handleSectionChange(section)}
                className="hover:text-secondary transition"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div
          className="md:hidden text-2xl text-white dark:text-white cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 text-white/50 dark:text-white h-[700px]"
          style={{
            backgroundImage: "url('/mainbg.png')",
            backgroundAttachment: "fixed", // Fixes the background position
            backgroundSize: "cover", // Ensures the image covers the entire section
            backgroundPosition: "center", // Centers the background image
          }}
        >
          <ul className="flex flex-col space-y-6 py-6 px-8 text-lg w-full justify-start items-start">
            {["about", "projects", "skills", "contact"].map((section) => (
              <motion.li
                key={section}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  onClick={() => handleSectionChange(section)}
                  className="hover:text-secondary transition"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
