"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditForm({
  Experience,
  onSave,
  onCancel,
}: {
  Experience: {
    id: string; // Ensure id is always a string
    role: string;
    company: string;
    year: number | string;
    description: string;
  };
  onSave: (updatedExperience: any) => void;
  onCancel: () => void;
}) {
  const [editingExperience, setEditingExperience] = useState(Experience);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const showToastMessage = () => {
    if (errorMessage) toast.error(errorMessage);
    if (successMessage) toast.success(successMessage);
  };

  useEffect(() => {
    showToastMessage();
    setErrorMessage("");
    setSuccessMessage("");
  }, [errorMessage, successMessage]);

  const handleSave = () => {
    if (
      !editingExperience.role ||
      !editingExperience.company ||
      !editingExperience.year ||
      !editingExperience.description
    ) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    const formattedExperience = {
      ...editingExperience,
      year: Number(editingExperience.year),
    };

    if (isNaN(formattedExperience.year) || formattedExperience.year <= 0) {
      setErrorMessage("Year must be a valid positive number.");
      return;
    }

    onSave(formattedExperience); // Call parent function to save the data
    setSuccessMessage("Experience updated successfully.");
  };

  return (
    <div className="mt-6 min-w-[600px]">
      <h2 className="text-xl font-semibold mb-4">Edit Experience</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="role"
          value={editingExperience.role}
          onChange={(e) =>
            setEditingExperience({ ...editingExperience, role: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="company"
          value={editingExperience.company}
          onChange={(e) =>
            setEditingExperience({
              ...editingExperience,
              company: e.target.value,
            })
          }
          className="border px-4 py-2 rounded"
        />
        <textarea
          placeholder="description"
          value={editingExperience.description}
          onChange={(e) =>
            setEditingExperience({
              ...editingExperience,
              description: e.target.value,
            })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Year"
          value={editingExperience.year}
          onChange={(e) =>
            setEditingExperience({ ...editingExperience, year: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
