"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditForm({
  award,
  onSave,
  onCancel,
}: {
  award: {
    id?: string; // Allow undefined
    title: string;
    description: string;
    year: number | string; // To allow form handling before converting to number
  };
  onSave: (updatedAward: any) => void;
  onCancel: () => void;
}) {
  const [editingAward, setEditingAward] = useState(award);
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
      !editingAward.title ||
      !editingAward.description ||
      !editingAward.year
    ) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    // Ensure `year` is a valid number
    const formattedAward = {
      ...editingAward,
      year: Number(editingAward.year),
    };

    if (isNaN(formattedAward.year) || formattedAward.year < 0) {
      setErrorMessage("Year must be a valid positive number.");
      return;
    }

    onSave(formattedAward);
    setSubmitTrue("Award updated successfully.");
  };

  return (
    <div className="mt-6 min-w-[600px]">
      <h2 className="text-xl font-semibold mb-4">Edit Award</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={editingAward.title}
          onChange={(e) =>
            setEditingAward({ ...editingAward, title: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={editingAward.description}
          onChange={(e) =>
            setEditingAward({
              ...editingAward,
              description: e.target.value,
            })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Year"
          value={editingAward.year}
          onChange={(e) =>
            setEditingAward({
              ...editingAward,
              year: e.target.value,
            })
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
