"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddAwardForm({
  onAdd,
}: {
  onAdd: (award: any) => void;
}) {
  const [newAward, setNewAward] = useState<any>({
    title: "",
    description: "",
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
    if (!newAward.title || !newAward.description || !newAward.year) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    onAdd(newAward);

    setSubmitTrue("Award added successfully");
    setNewAward({
      title: "",
      description: "",
      year: "",
    });
  };

  console.log(newAward);

  return (
    <div className="mb-6 bg-mainB md:p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Award</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Award Name"
          value={newAward.title}
          onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
          className="border px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <textarea
          placeholder="Description"
          value={newAward.description}
          onChange={(e) =>
            setNewAward({ ...newAward, description: e.target.value })
          }
          className="border px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="number"
          placeholder="Year"
          value={newAward.year}
          onChange={(e) => setNewAward({ ...newAward, year: e.target.value })}
          className="border px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="w-full flex flex-col justify-center items-center">
          <button
            onClick={handleAdd}
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-secondary transition-colors duration-200"
          >
            Add Award
          </button>
        </div>
      </div>
    </div>
  );
}
