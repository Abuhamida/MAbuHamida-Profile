"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddExperienceForm({ onAdd }: { onAdd: (Experience: any) => void }) {
  const [newExperience, setNewExperience] = useState<any>({
    role: "",
    company: "",
    year: "",
    description:"",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [submitTrue, setSubmitTrue] = useState("");

  const showToastMessage = () => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (submitTrue) {
      toast.success(submitTrue);
    }
  };

  useEffect(() => {
    showToastMessage();
    setErrorMessage("");
    setSubmitTrue("");
  }, [errorMessage, submitTrue]);

  const handleAdd = () => {
    // Validate required fields
    if (!newExperience.role || !newExperience.company || !newExperience.year ||!newExperience.description) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    onAdd(newExperience);

    setSubmitTrue("Experience added successfully");
    setNewExperience({
      role: "",
      company: "",
      year: "",
      description:"",
    });
  };

  return (
    <div className="mb-6 ">
      <h2 className="text-xl font-semibold mb-4">Add New Experience</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Experience role"
          value={newExperience.role}
          onChange={(e) =>
            setNewExperience({ ...newExperience, role: e.target.value })
          }
              className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Experience Company"
          value={newExperience.company}
          onChange={(e) =>
            setNewExperience({ ...newExperience, company: e.target.value })
          }
              className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />
        <textarea
          placeholder="Description"
          value={newExperience.description}
          onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />

        <input
          type="year"
          placeholder="Year"
          value={newExperience.year}
          onChange={(e) => setNewExperience({ ...newExperience, year: e.target.value })}
              className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />

        <div className="flex justify-end items-center">
          <button
            onClick={handleAdd}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-box-gradient-2 transition duration-200"
            >
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
}
