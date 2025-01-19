"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditForm({
  edu,
  onSave,
  onCancel,
}: {
  edu: {
    id: string;
    institution: string;
    degree: string;
    year: number | string;
  };
  onSave: (updatedEdu: any) => void;
  onCancel: () => void;
}) {
  const [editingEdu, setEditingEdu] = useState(edu);
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
    if (!editingEdu.institution || !editingEdu.degree || !editingEdu.year) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    const formattedEdu = {
      ...editingEdu,
      year: Number(editingEdu.year),
    };

    if (isNaN(formattedEdu.year) || formattedEdu.year <= 0) {
      setErrorMessage("Year must be a valid positive number.");
      return;
    }

    onSave(formattedEdu); // Call parent function to save the data
    setSuccessMessage("Education updated successfully.");
  };

  return (
    <div className="mt-6  ">
      <h2 className="text-2xl font-semibold text-white mb-4">Edit Education</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Institution"
          value={editingEdu.institution}
          onChange={(e) =>
            setEditingEdu({ ...editingEdu, institution: e.target.value })
          }
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <textarea
          placeholder="Degree"
          value={editingEdu.degree}
          onChange={(e) =>
            setEditingEdu({ ...editingEdu, degree: e.target.value })
          }
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="number"
          placeholder="Year"
          value={editingEdu.year}
          onChange={(e) =>
            setEditingEdu({ ...editingEdu, year: e.target.value })
          }
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-[#c80036] transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
