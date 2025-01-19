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
    <div className="mb-6 ">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Add New Education
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Edu Name"
          value={newEdu.institution}
          onChange={(e) =>
            setNewEdu({ ...newEdu, institution: e.target.value })
          }
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <textarea
          placeholder="Description"
          value={newEdu.degree}
          onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <input
          type="year"
          placeholder="Year"
          value={newEdu.year}
          onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <div className="w-full flex flex-col justify-center items-center">
          <button
            onClick={handleAdd}
            className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-[#c80036] transition-colors"
          >
            Add Edu
          </button>
        </div>
      </div>
    </div>
  );
}
