"use client";
import React, { useState, useEffect } from "react";
import AddForm from "./component/Add";
import EditForm from "./component/Edit";
import List from "./component/List";

interface Experience {
  id: string; // Ensure id is always a string
  role: string;
  company: string;
  year: number;
  description: string;
  Image_url: string;
}

interface ExperienceDashboardProps {
  closeSection: () => void;
}

export default function ExperienceDashboard({
  closeSection,
}: ExperienceDashboardProps) {
  const [Experience, setExperience] = useState<Experience[]>([]);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [add, setAdd] = useState(false);

  // Fetch Experience from the API
  const getExperience = async () => {
    try {
      const response = await fetch("/api/experience/get");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data: Experience[] = await response.json();
      setExperience(data);
    } catch (error) {
      console.error("Error fetching Experience:", error);
      setError("Failed to fetch Experience");
    }
  };

  // Add a new Experience
  const addExperience = async (newExperience: Experience) => {
    try {
      const response = await fetch("/api/experience/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExperience),
      });
      if (!response.ok) throw new Error("Failed to add Experience");
      getExperience();
    } catch (error) {
      console.error("Error adding Experience:", error);
      setError("Failed to add Experience");
    }
  };

  // Update an existing Experience
  const updateExperience = async (updatedExperience: Experience) => {
    try {
      const response = await fetch("/api/experience/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExperience),
      });
      if (!response.ok) throw new Error("Failed to update Experience");
      setEditingExperience(null);
      getExperience();
    } catch (error) {
      console.error("Error updating Experience:", error);
      setError("Failed to update Experience");
    }
  };

  // Delete an Experience by ID
  const deleteExperience = async (id: string) => {
    try {
      const response = await fetch("/api/experience/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete Experience");
      getExperience();
    } catch (error) {
      console.error("Error deleting Experience:", error);
      setError("Failed to delete Experience");
    }
  };

  useEffect(() => {
    getExperience();
  }, []);

  return (
    <div className="md:p-6 w-full bg-mainB text-primary min-h-screen">
      <div className="flex justify-between items-center mb-5 w-full fixed top-0 left-0 px-2 md:px-8 py-4 bg-gradient-to-r from-[#010101] to-[#191717] text-white z-10">
        <button
          onClick={closeSection}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary transition duration-200"
        >
          Close
        </button>
        <h1 className="md:text-2xl font-bold">Experience Dashboard</h1>
        {add ? (
          <button
            onClick={() => setAdd(false)}
            className="px-4 py-2 bg-primary text-mainB rounded-lg hover:border border-secondary hover:text-secondary hover:bg-box-gradient-2 transition-colors duration-200"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setAdd(true)}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:border border-secondary hover:text-secondary hover:bg-box-gradient-2 transition-colors duration-200"
          >
            Add
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Add or Edit Experience Form */}
      <div className="w-full flex flex-col  justify-center items-start gap-5 pt-20 ">
        {(add || editingExperience) && (
          <div className="w-full">
            {add && <AddForm onAdd={addExperience} />}
            {!add && editingExperience && (
              <EditForm
                Experience={editingExperience}
                onSave={updateExperience}
                onCancel={() => setEditingExperience(null)}
              />
            )}
          </div>
        )}

        <div className="w-full">
          <List
            Experience={Experience}
            onEdit={(Experience) => {
              setEditingExperience(Experience);
              setAdd(false); // Hide the Add Experience Form when editing
            }}
            onDelete={deleteExperience}
          />
        </div>
      </div>
    </div>
  );
}
