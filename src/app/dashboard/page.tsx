"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectsDashboard from "./component/ProjectsDashboard";

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
    const response = await fetch("/api/logout", {
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
  
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen">
      {!activeSection && (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Mohamed AbuHamida Dashboard</h1>
          <div className="flex justify-center gap-5 items-center w-full pt-10">
            <button
              onClick={() => setActiveSection("Projects")}
              className="px-4 py-2 text-secondary border border-secondary hover:scale-110 hover:bg-secondary/50 rounded-xl"
            >
              Projects
            </button>
            <button
              onClick={() => setActiveSection("Education")}
              className="px-4 py-2 text-secondary border border-secondary hover:scale-110 hover:bg-secondary/50 rounded-xl"
            >
              Education
            </button>
            <button
              onClick={() => setActiveSection("Skills")}
              className="px-4 py-2 text-secondary border border-secondary hover:scale-110 hover:bg-secondary/50 rounded-xl"
            >
              Skills
            </button>
            <button
              onClick={() => setActiveSection("Awards")}
              className="px-4 py-2 text-secondary border border-secondary hover:scale-110 hover:bg-secondary/50 rounded-xl"
            >
              Awards
            </button>
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
          Education Content
          <button onClick={closeSection}>Close</button>
        </div>
      )}
      {activeSection === "Skills" && (
        <div>
          Skills Content
          <button onClick={closeSection}>Close</button>
        </div>
      )}
      {activeSection === "Awards" && (
        <div>
          Awards Content
          <button onClick={closeSection}>Close</button>
        </div>
      )}
    </div>
  );
}
