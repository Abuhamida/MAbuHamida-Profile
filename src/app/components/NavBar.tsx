"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosContact } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { SiCodeproject } from "react-icons/si";
import { SiHyperskill } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
interface NavBarProps {
  setActiveSection: (section: string) => void;
}

export default function NavBar({ setActiveSection }: NavBarProps) {
  const mainLinks = [
    { name: "about", icon: IoIosContact, link: "#about" },
    { name: "projects", icon: SiCodeproject, link: "#projects" },
    { name: "skills", icon: SiHyperskill, link: "#skills" },
    { name: "contact", icon: AiOutlineMessage, link: "#contact" },
  ];

  const HyperLinks = [
    {
      name: "FaceBook",
      icon: FaFacebookF,
      link: "https://www.facebook.com/mohammed.abuhameda.3",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/mohammed-abuhamida",
    },
    {
      name: "Github",
      icon: FaGithub,
      link: "https://github.com/AbuHamida",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (isMenuOpen) toggleMenu(); // Close the menu on mobile
  };

  return (
    <header className="bg-opacity-10 backdrop-blur-lg fixed w-full md:w-12 md:hover:w-40  left-0 top-0 shadow-lg dark:bg-[#171717] space-mono-bold z-50  group transition-all duration-300">
      <nav className="flex md:flex-col items-center justify-between md:min-h-screen py-2 px-5 md:px-0">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => handleSectionChange("hero")}
          className="md:mb-4"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="md:w-8"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-col justify-center w-full gap-6 items-start px-4">
          {mainLinks.map((section) => (
            <li key={section.name} className="flex items-center w-full">
              <Link
                href={section.link}
                onClick={() => handleSectionChange(section.name)}
                className="flex items-center w-full text-yellow-50 dark:text-white transition text-lg hover:text-secondary"
              >
                <section.icon className="text-2xl flex-shrink-0" />
                <span className="hidden ml-4 group-hover:block ">
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="hidden md:flex flex-col justify-center w-full gap-6 items-start px-4">
          {HyperLinks.map((section) => (
            <li key={section.name} className="flex items-center w-full">
              <Link
                href={section.link}
                onClick={() => handleSectionChange(section.name)}
                className="flex items-center w-full text-yellow-50 dark:text-white transition text-lg hover:text-secondary"
              >
                <section.icon className="text-2xl flex-shrink-0" />
                <span className="hidden ml-4 group-hover:block ">
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Trigger */}
        <div
          className="md:hidden text-2xl text-white dark:text-white cursor-pointer rounded-full shadow-sm shadow-slate-300 p-3"
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
          className="md:hidden bg-white dark:bg-gray-900 text-white/50 dark:text-white h-[700px] bg-fixed-gradient"
          
        >
          <ul className="flex flex-col space-y-6 py-6 px-8 text-lg w-full justify-start items-start">
            {mainLinks.map((section) => (
              <motion.li
                key={section.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  onClick={() => handleSectionChange(section.name)}
                  className="hover:text-secondary transition"
                >
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                </button>
              </motion.li>
            ))}
          </ul>
          <ul className="flex space-x-6  py-6 px-8 text-lg w-full justify-center items-start">
            {HyperLinks.map((section) => (
              <motion.li
                key={section.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href={section.link}
                  className="hover:text-secondary transition"
                >
                  <section.icon className="text-2xl flex-shrink-0 " />
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
