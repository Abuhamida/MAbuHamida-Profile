"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddForm({ onAdd }: { onAdd: (Services: any) => void }) {
  const [newServices, setNewServices] = useState<any>({
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
      !newServices.name ||
      !newServices.category ||
      !newServices.description ||
      !newServices.price ||
      !newServices.features ||
      !newServices.discount ||
      !newServices.delivery ||
      !newServices.revision
    ) {
      setErrorMessage("Please Fill All Fields");
      return;
    }

    const formattedServices = {
      ...newServices,
      features: newServices.features
        .split(",")
        .map((s: string) => s.trim()),
    };

    onAdd(formattedServices);

    setSubmitTrue("Services Added Successfully");
    setNewServices({
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
      <h2 className="text-xl font-semibold mb-4">Add New Services</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-5 w-full justify-center items-center">
          <input
            type="text"
            placeholder="Name"
            value={newServices.name}
            onChange={(e) =>
              setNewServices({ ...newServices, name: e.target.value })
            }
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <input
          type="text"
          placeholder="Category"
          value={newServices.category}
          onChange={(e) =>
            setNewServices({ ...newServices, category: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newServices.description}
          onChange={(e) =>
            setNewServices({ ...newServices, description: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Price"
          value={newServices.price}
          onChange={(e) =>
            setNewServices({ ...newServices, price: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Discount"
          value={newServices.discount}
          onChange={(e) =>
            setNewServices({ ...newServices, discount: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Features (comma separated)"
          value={newServices.features}
          onChange={(e) =>
            setNewServices({ ...newServices, features: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Delivery Time"
          value={newServices.delivery}
          onChange={(e) =>
            setNewServices({ ...newServices, delivery: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Revisions"
          value={newServices.revision}
          onChange={(e) =>
            setNewServices({ ...newServices, revision: e.target.value })
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
