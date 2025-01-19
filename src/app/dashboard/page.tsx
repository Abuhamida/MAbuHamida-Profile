"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectsDashboard from "./projects/ProjectsDashboard";
import AwardsDashboard from "./awards/AwardsDashboard";
import ServicesDashboard from "./services/ServicesDashboard";
import SkillsDashboard from "./skills/SkillsDashboard";
import EduDashboard from "./edu/EduDashboard";
import ExperienceDashboard from "./experience/ExperienceDashboard";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = () => {
    if (
      username === process.env.NEXT_PUBLIC_USER_NAME &&
      password === process.env.NEXT_PUBLIC_USER_PASSWORD
    ) {
      setError(""); // Clear any previous error
    } else {
      setError("Invalid username or password.");
    }
  };

  const closeSection = () => {
    setActiveSection(null);
  };

  const handleLogout = async () => {
    setActiveSection(null);

    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  };

  const dashboardItems = [
    "Projects",
    "Education",
    "Skills",
    "Awards",
    "Services",
    "Experience",
  ];

  return (
    <div className="w-full min-h-screen bg-mainB text-primary flex flex-col items-center p-6">
      {!activeSection && (
        <div className="w-full flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Mohamed AbuHamida Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {dashboardItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(item)}
                className="px-6 py-3 bg-gradient-to-r from-[#2D2D2D] to-[#3C3C3C] text-secondary border border-secondary rounded-xl hover:scale-105 hover:from-[#3C3C3C] hover:to-[#2D2D2D] transition-all duration-300 shadow-lg"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="mt-10 bg-red-600 px-6 py-3 rounded-lg text-white hover:bg-red-700 transition duration-200 shadow-md"
          >
            Logout
          </button>
        </div>
      )}

      {activeSection === "Projects" && (
        <ProjectsDashboard closeSection={closeSection} />
      )}
      {activeSection === "Education" && (
        <EduDashboard closeSection={closeSection} />
      )}
      {activeSection === "Skills" && (
        <SkillsDashboard closeSection={closeSection} />
      )}
      {activeSection === "Awards" && (
        <AwardsDashboard closeSection={closeSection} />
      )}
      {activeSection === "Services" && (
        <ServicesDashboard closeSection={closeSection} />
      )}
      {activeSection === "Experience" && (
        <ExperienceDashboard closeSection={closeSection} />
      )}
    </div>
  );
}
