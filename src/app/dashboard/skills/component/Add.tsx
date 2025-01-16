"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddForm({ onAdd }: { onAdd: (project: any) => void }) {
  const [Skills, setSkills] = useState<any>({
    category_id: "",
    name: "",
    percentage: "",
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
    // التحقق من الحقول المطلوبة
    if (!Skills.category_id || !Skills.name || !Skills.percentage) {
      setErrorMessage("Please Fill All Fields");
      return;
    }

    onAdd(Skills);

    setSubmitTrue("Project Added Successfully");
    setSkills({
      category_id: "",
      name: "",
      percentage: "",
    });
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-5 w-full justify-center items-center">
          <input
            type="text"
            placeholder="Skill Name"
            value={Skills.name}
            onChange={(e) =>
              setSkills({ ...Skills, name: e.target.value })
            }
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="category id "
            value={Skills.category_id}
            onChange={(e) => setSkills({ ...Skills, category_id: e.target.value })}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <input
        type="number"
          placeholder="percentage"
          value={Skills.percentage}
          onChange={(e) => setSkills({ ...Skills, percentage: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <div className="w-1/2 flex flex-col justify-center items-end">
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
          >
            Add Skills
          </button>
        </div>
      </div>
    </div>
  );
}
