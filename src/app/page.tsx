"use client";
import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/about/About";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Main2 from "./components/Main";

export default function Main() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <div
    className="relative w-full min-h-screen flex flex-col items-center justify-center text-center text-white md:pt-0 bg-fixed bg-cover bg-center bg-fixed-gradient"

      
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40  "></div>
      <NavBar setActiveSection={setActiveSection} />
      <div className=" flex flex-col justify-center items-center w-full z-10">
        {activeSection === "hero" && (
          <Main2 setActiveSection={setActiveSection} />
        )}
        {activeSection === "about" && (
          <About setActiveSection={setActiveSection} />
        )}
        {activeSection === "projects" && (
          <Projects setActiveSection={setActiveSection} />
        )}
        {/* {activeSection === "skills" && (
          <Skills setActiveSection={setActiveSection} />
        )} */}
        {activeSection === "contact" && (
          <Contact setActiveSection={setActiveSection} />
        )}
      </div>
      <div className=" absolute bottom-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
}
