"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditForm({
  Skills,
  onSave,
  onCancel,
}: {
  Skills: {
    id: string;
    name: string;
    category_id: number;
    percentage: number;
  };
  onSave: (updatedSkills: any) => void;
  onCancel: () => void;
}) {
  const [editingSkills, setEditingSkills] = useState(Skills);
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

  const handleSave = () => {
    // Validate required fields
    if (
      !editingSkills.name ||
      !editingSkills.category_id ||
      !editingSkills.percentage
    ) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    // Ensure `category_id` is a valid number
    const formattedSkills = {
      ...editingSkills,
      category_id: Number(editingSkills.category_id),
    };

    if (isNaN(formattedSkills.category_id) || formattedSkills.category_id < 0) {
      setErrorMessage("Category ID must be a valid positive number.");
      return;
    }

    onSave(formattedSkills);
    setSubmitTrue("Skills updated successfully.");
  };

  return (
    <div className="mt-6 min-w-[600px]">
      <h2 className="text-xl font-semibold mb-4">Edit Skills</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="name"
          value={editingSkills.name}
          onChange={(e) =>
            setEditingSkills({ ...editingSkills, name: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
        type="number"
          placeholder="percentage"
          value={editingSkills.percentage.toString()} // Convert percentage to string for textarea
          onChange={(e) =>
            setEditingSkills({
              ...editingSkills,
              percentage: Number(e.target.value),
            })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Category ID"
          value={editingSkills.category_id.toString()} // Convert category_id to string for input
          onChange={(e) =>
            setEditingSkills({
              ...editingSkills,
              category_id: Number(e.target.value),
            })
          }
          className="border px-4 py-2 rounded"
        />
        {/* Assuming `year` input should be added here if needed */}
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
