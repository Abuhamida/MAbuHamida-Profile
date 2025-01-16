"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddForm({ onAdd }: { onAdd: (Skills: any) => void }) {
  const [newSkills, setNewSkills] = useState<any>({
    name: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    features: "",
    delivery: "",
    revision: "",
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
    if (
      !newSkills.name ||
      !newSkills.category ||
      !newSkills.description ||
      !newSkills.price ||
      !newSkills.features ||
      !newSkills.discount ||
      !newSkills.delivery ||
      !newSkills.revision
    ) {
      setErrorMessage("Please Fill All Fields");
      return;
    }

    const formattedSkills = {
      ...newSkills,
      features: newSkills.features
        .split(",")
        .map((s: string) => s.trim()),
    };

    onAdd(formattedSkills);

    setSubmitTrue("Skills Added Successfully");
    setNewSkills({
      name: "",
      category: "",
      description: "",
      price: "",
      discount: "",
      features: "",
      delivery: "",
      revision: "",
    });
  };

  return (
    <div className="mb-6 min-w-[600px]">
      <h2 className="text-xl font-semibold mb-4">Add New Skills</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-5 w-full justify-center items-center">
          <input
            type="text"
            placeholder="Name"
            value={newSkills.name}
            onChange={(e) =>
              setNewSkills({ ...newSkills, name: e.target.value })
            }
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <input
          type="text"
          placeholder="Category"
          value={newSkills.category}
          onChange={(e) =>
            setNewSkills({ ...newSkills, category: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newSkills.description}
          onChange={(e) =>
            setNewSkills({ ...newSkills, description: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Price"
          value={newSkills.price}
          onChange={(e) =>
            setNewSkills({ ...newSkills, price: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Discount"
          value={newSkills.discount}
          onChange={(e) =>
            setNewSkills({ ...newSkills, discount: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Features (comma separated)"
          value={newSkills.features}
          onChange={(e) =>
            setNewSkills({ ...newSkills, features: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Delivery Time"
          value={newSkills.delivery}
          onChange={(e) =>
            setNewSkills({ ...newSkills, delivery: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Revisions"
          value={newSkills.revision}
          onChange={(e) =>
            setNewSkills({ ...newSkills, revision: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />

        <div className="flex justify-center items-center gap-5">
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Services
          </button>
        </div>
      </div>
    </div>
  );
}
