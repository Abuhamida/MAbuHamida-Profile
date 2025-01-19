"use client";
import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function EditForm({
  Services,
  onSave,
  onCancel,
}: {
  Services: any;
  onSave: (updatedServices: any) => void;
  onCancel: () => void;
}) {
  const [editingServices, setEditingServices] = useState(Services);
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
    if (
      !editingServices.id ||
      !editingServices.name ||
      !editingServices.category ||
      !editingServices.description ||
      !editingServices.features ||
      !editingServices.price ||
      !editingServices.discount ||
      !editingServices.delivery ||
      !editingServices.revision
    ) {
      setErrorMessage("Please Fill All Fields");
      return;
    }

    const formattedServices = {
      ...editingServices,
      features: Array.isArray(editingServices.features)
        ? editingServices.features
        : editingServices.features.split(",").map((f: string) => f.trim()),
    };

    onSave(formattedServices);
    setSubmitTrue("Services Update Successfully");
  };

  return (
    <div className="mt-6 ">
      <h2 className="text-xl font-semibold mb-4">Edit Services</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Service Name"
          value={editingServices.name}
          onChange={(e) =>
            setEditingServices({ ...editingServices, name: e.target.value })
          }
          className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="text"
          placeholder="Category"
          value={editingServices.category}
          onChange={(e) =>
            setEditingServices({ ...editingServices, category: e.target.value })
          }
          className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <textarea
          placeholder="Description"
          value={editingServices.description}
          onChange={(e) =>
            setEditingServices({
              ...editingServices,
              description: e.target.value,
            })
          }
          className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="text"
          placeholder="Features (comma separated)"
          value={
            Array.isArray(editingServices.features)
              ? editingServices.features.join(", ")
              : editingServices.features
          }
          onChange={(e) =>
            setEditingServices({
              ...editingServices,
              features: e.target.value.split(",").map((f: string) => f.trim()),
            })
          }
          className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="number"
          placeholder="Price"
          value={editingServices.price}
          onChange={(e) =>
            setEditingServices({
              ...editingServices,
              price: parseFloat(e.target.value) || 0,
            })
          }
          className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="number"
          placeholder="Discount"
          value={editingServices.discount}
          onChange={(e) =>
            setEditingServices({
              ...editingServices,
              discount: parseFloat(e.target.value) || 0,
            })
          }
          className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="text"
          placeholder="Delivery Time"
          value={editingServices.delivery}
          onChange={(e) =>
            setEditingServices({
              ...editingServices,
              delivery: e.target.value,
            })
          }
          className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="text"
          placeholder="Revisions"
          value={editingServices.revision}
          onChange={(e) =>
            setEditingServices({
              ...editingServices,
              revision: e.target.value,
            })
          }
          className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        />
          <div className="mt-4 w-full flex gap-2 justify-end items-center ">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-[#c80036] focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
            >
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-[#555] text-white rounded-lg hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#888] w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
      </div>
    </div>
  );
}
