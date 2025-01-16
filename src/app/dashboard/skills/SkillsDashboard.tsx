"use client";
import React, { useState, useEffect } from "react";
import AddForm from "./component/Add";
import EditForm from "./component/Edit";
import List from "./component/List";

interface Skills {
  id: string;
  name: string;
  category_id: number;
  percentage: number;
}

interface SkillsDashboardProps {
  closeSection: () => void;
}

export default function ServicesDashboard({
  closeSection,
}: SkillsDashboardProps) {
  const [Skills, setSkills] = useState<Skills[]>([]);
  const [editingSkills, setEditingSkills] = useState<Skills | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [add, setAdd] = useState(false);

  // Fetch Skills from the API
  const getSkills = async () => {
    try {
      const response = await fetch("/api/skills/get");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data: Skills[] = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching Skills:", error);
      setError("Failed to fetch Skills");
    }
  };

  // Add a new Skills
  const addSkills = async (newSkills: Skills) => {
    try {
      const response = await fetch("/api/skills/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkills),
      });
      if (!response.ok) throw new Error("Failed to add Skills");
      getSkills();
    } catch (error) {
      console.error("Error adding Skills:", error);
      setError("Failed to add Skills");
    }
  };

  // Update an existing Skills
  const updateSkills = async (updatedSkills: Skills) => {
    try {
      const response = await fetch("/api/skills/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSkills),
      });
      if (!response.ok) throw new Error("Failed to update Skills");
      setEditingSkills(null);
      getSkills();
    } catch (error) {
      console.error("Error updating Skills:", error);
      setError("Failed to update Skills");
    }
  };

  // Delete a Skills by ID
  const deleteSkills = async (id: string) => {
    try {
      const response = await fetch("/api/skills/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete Skills");
      getSkills();
    } catch (error) {
      console.error("Error deleting Skills:", error);
      setError("Failed to delete Skills");
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-5 w-full fixed top-0 left-0 px-20 py-3 bg-primary">
        <button
          onClick={closeSection}
          className=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close Section
        </button>
        <h1 className="text-2xl font-bold">Services Dashboard </h1>
        {add ? (
          <button
            onClick={() => setAdd(false)}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:border border-secondary hover:text-secondary hover:bg-white transition-colors duration-200"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setAdd(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:border border-green-600 hover:text-green-600 hover:bg-white transition-colors duration-200"
          >
            Add New Skills
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Add Skills Form */}
      <div className="w-full flex justify-center items-center gap-5 pt-12">
        {(add || editingSkills) && (
          <div className="w-full">
            {add && <AddForm onAdd={addSkills} />}
            {!add && editingSkills && (
              <EditForm
              Skills={editingSkills}
                onSave={updateSkills}
                onCancel={() => setEditingSkills(null)}
              />
            )}
          </div>
        )}

        <div className="w-full max-w-screen-md">
          <List
            Skills={Skills}
            onEdit={(Skills) => {
              setEditingSkills(Skills);
              setAdd(false); // Hide the Add Skills Form when editing
            }}
            onDelete={deleteSkills}
          />
        </div>
      </div>
    </div>
  );
}
