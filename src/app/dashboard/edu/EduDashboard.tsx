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
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-5 w-full fixed top-0 left-0 px-20 py-3 bg-primary">
        <button
          onClick={closeSection}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close Section
        </button>
        <h1 className="text-2xl font-bold">Education Dashboard</h1>
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
            Add New Edu
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Add or Edit Edu Form */}
      <div className="w-full flex justify-center items-center gap-5 pt-12">
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
