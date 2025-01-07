"use client";
import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

import { useRouter } from 'next/router'

import { usePathname } from "next/navigation";

export default function Main() {
  const [activeSection, setActiveSection] = useState("hero");
  const router = usePathname();
  
  console.log(router);
  useEffect(() => {
    if (router.includes("#")) {
      const hash = router.split("#")[1]; // Extract 'hero' from '#hero'
      console.log("Hash:", hash);
      setActiveSection(hash);     
    }
  }, [router]);
  return (
    <div
      className="relative bg-cover bg-center w-full min-h-screen  flex flex-col items-center justify-center text-center text-white pb-24 pt-20"
      style={{
        backgroundImage: "url('/mainbg.png')",
        backgroundAttachment: "fixed", // Fixes the background position
        backgroundSize: "cover", // Ensures the image covers the entire section
        backgroundPosition: "center", // Centers the background image
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40  "></div>
      <NavBar setActiveSection={setActiveSection} />
      <div className=" flex flex-col justify-center items-center w-full z-10">
        {activeSection === "hero" && (
          <Hero setActiveSection={setActiveSection} />
        )}
        {activeSection === "about" && (
          <About setActiveSection={setActiveSection} />
        )}
        {activeSection === "projects" && (
          <Projects setActiveSection={setActiveSection} />
        )}
        {activeSection === "skills" && (
          <Skills setActiveSection={setActiveSection} />
        )}
        {activeSection === "contact" && (
          <Contact setActiveSection={setActiveSection} />
        )}
      </div>
      <div className=" absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
