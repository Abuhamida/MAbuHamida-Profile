"use client";
import React, { useState, useEffect } from "react";
import AddForm from "./component/Add";
import EditForm from "./component/Edit";
import List from "./component/List";

interface Award {
  id: string;
  title: string;
  description: string;
  year: number;
}

interface AwardsDashboardProps {
  closeSection: () => void;
}

export default function AwardsDashboard({
  closeSection,
}: AwardsDashboardProps) {
  const [awards, setAwards] = useState<Award[]>([]);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [add, setAdd] = useState(false);

  const getAwards = async () => {
    try {
      const response = await fetch("/api/awards/get");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data: Award[] = await response.json();
      setAwards(data);
    } catch (error) {
      console.error("Error fetching awards:", error);
      setError("Failed to fetch awards");
    }
  };

  const addAward = async (newAward: Award) => {
    try {
      const response = await fetch("/api/awards/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAward),
      });
      if (!response.ok) throw new Error("Failed to add award");
      getAwards();
    } catch (error) {
      console.error("Error adding award:", error);
      setError("Failed to add award");
    }
  };

  const updateAward = async (updatedAward: Award) => {
    try {
      const response = await fetch("/api/awards/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAward),
      });
      if (!response.ok) throw new Error("Failed to update award");
      setEditingAward(null);
      getAwards();
    } catch (error) {
      console.error("Error updating award:", error);
      setError("Failed to update award");
    }
  };

  const deleteAward = async (id: string) => {
    try {
      const response = await fetch("/api/awards/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete award");
      getAwards();
    } catch (error) {
      console.error("Error deleting award:", error);
      setError("Failed to delete award");
    }
  };

  useEffect(() => {
    getAwards();
  }, []);

  return (
    <div className="md:p-6 w-full bg-mainB">
      <div className="flex justify-between items-center mb-5 w-full fixed top-0 left-0 px-2 md:px-8 py-4 bg-gradient-to-r from-[#010101] to-[#191717] text-white z-10">
        <button
          onClick={closeSection}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary transition duration-200"
        >
          Close 
        </button>
        <h1 className="md:text-2xl font-bold">Awards Dashboard</h1>
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

      <div className="w-full flex flex-col justify-center items-start gap-5 pt-20 ">
        {(add || editingAward) && (
          <div className="w-full">
            {add && <AddForm onAdd={addAward} />}
            {!add && editingAward && (
              <EditForm
                award={editingAward}
                onSave={updateAward}
                onCancel={() => setEditingAward(null)}
              />
            )}
          </div>
        )}

        <div className="w-full">
          <List
            awards={awards}
            onEdit={(award) => {
              setEditingAward(award);
              setAdd(false); 
            }}
            onDelete={deleteAward}
          />
        </div>
      </div>
    </div>
  );
}
