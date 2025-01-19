"use client";
import React, { useState, useEffect } from "react";
import AddForm from "./component/Add";
import EditForm from "./component/Edit";
import List from "./component/List";

interface Edu {
  id: string; // Ensure id is always a string
  institution: string;
  degree: string;
  year: number;
}

interface EducationDashboardProps {
  closeSection: () => void;
}

export default function EducationDashboard({
  closeSection,
}: EducationDashboardProps) {
  const [edu, setEdu] = useState<Edu[]>([]);
  const [editingEdu, setEditingEdu] = useState<Edu | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [add, setAdd] = useState(false);

  // Fetch Education from the API
  const getEducation = async () => {
    try {
      const response = await fetch("/api/edu/get");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data: Edu[] = await response.json();
      setEdu(data);
    } catch (error) {
      console.error("Error fetching Education:", error);
      setError("Failed to fetch Education");
    }
  };

  // Add a new Edu
  const addEducation = async (newEdu: Edu) => {
    try {
      const response = await fetch("/api/edu/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEdu),
      });
      if (!response.ok) throw new Error("Failed to add Edu");
      getEducation();
    } catch (error) {
      console.error("Error adding Edu:", error);
      setError("Failed to add Edu");
    }
  };

  // Update an existing Edu
  const updateEducation = async (updatedEdu: Edu) => {
    try {
      const response = await fetch("/api/edu/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEdu),
      });
      if (!response.ok) throw new Error("Failed to update Edu");
      setEditingEdu(null);
      getEducation();
    } catch (error) {
      console.error("Error updating Edu:", error);
      setError("Failed to update Edu");
    }
  };

  // Delete an Edu by ID
  const deleteEdu = async (id: string) => {
    try {
      const response = await fetch("/api/edu/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete Edu");
      getEducation();
    } catch (error) {
      console.error("Error deleting Edu:", error);
      setError("Failed to delete Edu");
    }
  };

  useEffect(() => {
    getEducation();
  }, []);

  return (
    <div className="md:p-6 w-full">
      <div className="flex justify-between items-center mb-5 w-full fixed top-0 left-0 px-2 md:px-8 py-4 bg-gradient-to-r from-[#010101] to-[#191717] text-white z-10">
        <button
          onClick={closeSection}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary transition duration-200"
        >
          Close 
        </button>
        <h1 className="md:text-2xl font-bold">Education Dashboard</h1>
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
      {/* Add or Edit Edu Form */}
      <div className="w-full flex flex-col justify-center items-start gap-5 pt-20 ">
        {(add || editingEdu) && (
          <div className="w-full">
            {add && <AddForm onAdd={addEducation} />}
            {!add && editingEdu && (
              <EditForm
                edu={editingEdu}
                onSave={updateEducation}
                onCancel={() => setEditingEdu(null)}
              />
            )}
          </div>
        )}

        <div className="w-full">
          <List
            edu={edu}
            onEdit={(edu) => {
              setEditingEdu(edu);
              setAdd(false); // Hide the Add Edu Form when editing
            }}
            onDelete={deleteEdu}
          />
        </div>
      </div>
    </div>
  );
}
