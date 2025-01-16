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

  // Function to close the current section
  const closeSection = () => {
    setActiveSection(null);
  };

  const handleLogout = async () => {
    // Optionally reset any state or session data
    setActiveSection(null); // Reset active section

    // Make the API call to log the user out
    const response = await fetch("/api/user/logout", {
      method: "POST", // Ensure it's a POST request to logout
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // On successful logout, redirect the user to the login page
      router.push("/login");
    } else {
      // Handle any errors (optional)
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
    <div className="w-full flex flex-col justify-center items-center min-h-screen">
      {!activeSection && (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Mohamed AbuHamida Dashboard</h1>
          <div className="flex justify-center gap-5 items-center w-full pt-10">
            {dashboardItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(item)}
                className="px-4 py-2 text-secondary border border-secondary hover:scale-110 hover:bg-secondary/50 rounded-xl"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}

      {activeSection === "Projects" && (
        <ProjectsDashboard closeSection={closeSection} />
      )}
      {activeSection === "Education" && (
        <div>
          <EduDashboard closeSection={closeSection} />
        </div>
      )}
      {activeSection === "Skills" && (
        <div>
          <SkillsDashboard closeSection={closeSection} />
        </div>
      )}
      {activeSection === "Awards" && (
        <div>
          <AwardsDashboard closeSection={closeSection} />
        </div>
      )}
      {activeSection === "Services" && (
        <div>
          <ServicesDashboard closeSection={closeSection} />
        </div>
      )}
      {activeSection === "Experience" && (
        <div>
          <ExperienceDashboard closeSection={closeSection} />
        </div>
      )}
    </div>
  );
}
