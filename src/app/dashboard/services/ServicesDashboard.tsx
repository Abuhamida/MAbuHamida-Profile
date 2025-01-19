"use client";
import React, { useState, useEffect } from "react";
import AddForm from "./component/Add";
import EditForm from "./component/Edit";
import List from "./component/List";

interface Services {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  features: string[];
  discount: string;
}

interface ServicesDashboardProps {
  closeSection: () => void;
}

export default function ServicesDashboard({
  closeSection,
}: ServicesDashboardProps) {
  const [Services, setServices] = useState<Services[]>([]);
  const [editingServices, setEditingServices] = useState<Services | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [add, setAdd] = useState(false);

  // Fetch Services from the API
  const getServices = async () => {
    try {
      const response = await fetch("/api/services/get");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data: Services[] = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching Services:", error);
      setError("Failed to fetch Services");
    }
  };

  // Add a new Services
  const addServices = async (newServices: Services) => {
    try {
      const response = await fetch("/api/services/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newServices),
      });
      if (!response.ok) throw new Error("Failed to add Services");
      getServices();
    } catch (error) {
      console.error("Error adding Services:", error);
      setError("Failed to add Services");
    }
  };

  // Update an existing Services
  const updateServices = async (updatedServices: Services) => {
    try {
      const response = await fetch("/api/services/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedServices),
      });
      if (!response.ok) throw new Error("Failed to update Services");
      setEditingServices(null);
      getServices();
    } catch (error) {
      console.error("Error updating Services:", error);
      setError("Failed to update Services");
    }
  };

  // Delete a Services by ID
  const deleteServices = async (id: string) => {
    try {
      const response = await fetch("/api/services/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete Services");
      getServices();
    } catch (error) {
      console.error("Error deleting Services:", error);
      setError("Failed to delete Services");
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="md:p-6 w-full bg-mainB text-primary min-h-screen">
      <div className="flex justify-between items-center mb-5 w-full fixed top-0 left-0 px-2 md:px-8 py-4 bg-gradient-to-r from-[#010101] to-[#191717] text-white z-10">
        <button
          onClick={closeSection}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary transition duration-200"
        >
          Close
        </button>
        <h1 className="md:text-2xl font-bold">Projects Dashboard</h1>
        {add ? (
          <button
            onClick={() => setAdd(false)}
            className="px-4 py-2 bg-primary text-mainB rounded-lg hover:border border-secondary hover:text-secondary hover:bg-box-gradient-2 transition-colors duration-200"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setAdd(true)}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:border border-secondary hover:text-secondary hover:bg-box-gradient-2 transition-colors duration-200"
          >
            Add
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Add Services Form */}
      <div className="w-full flex flex-col  justify-center items-start gap-5 pt-20 ">
        {(add || editingServices) && (
          <div className="w-full">
            {add && <AddForm onAdd={addServices} />}
            {!add && editingServices && (
              <EditForm
                Services={editingServices}
                onSave={updateServices}
                onCancel={() => setEditingServices(null)}
              />
            )}
          </div>
        )}

        <div className="w-full ">
          <List
            Services={Services}
            onEdit={(Services) => {
              setEditingServices(Services);
              setAdd(false); // Hide the Add Services Form when editing
            }}
            onDelete={deleteServices}
          />
        </div>
      </div>
    </div>
  );
}
