"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddEduForm({ onAdd }: { onAdd: (Edu: any) => void }) {
  const [newEdu, setNewEdu] = useState<any>({
    institution: "",
    degree: "",
    year: "",
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
    if (!newEdu.institution || !newEdu.degree || !newEdu.year) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    onAdd(newEdu);

    setSubmitTrue("Edu added successfully");
    setNewEdu({
      institution: "",
      degree: "",
      year: "",
    });
  };

  return (
    <div className="mb-6 min-w-[600px]">
      <h2 className="text-xl font-semibold mb-4">Add New Award</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Edu Name"
          value={newEdu.institution}
          onChange={(e) =>
            setNewEdu({ ...newEdu, institution: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newEdu.degree}
          onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
          className="border px-4 py-2 rounded"
        />

        <input
          type="year"
          placeholder="Year"
          value={newEdu.year}
          onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
          className="border px-4 py-2 rounded"
        />

        <div className="flex justify-end items-center">
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Edu
          </button>
        </div>
      </div>
    </div>
  );
}
