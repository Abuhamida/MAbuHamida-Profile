"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { supabase } from "@/app/data/supabaseClient";

export default function EditForm({
  Experience,
  onSave,
  onCancel,
}: {
  Experience: {
    id: string; // Ensure id is always a string
    role: string;
    company: string;
    year: number | string;
    description: string;
    Image_url: string;
  };
  onSave: (updatedExperience: any) => void;
  onCancel: () => void;
}) {
  const [editingExperience, setEditingExperience] = useState(Experience);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for the selected file
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return editingExperience.Image_url; // Return the existing image URL if no new file is selected
    }

    const filename = nanoid(); // Generate a unique filename
    const fileExtension = selectedFile.name.split(".").pop();

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("EX_Image") // Replace with your bucket name
      .upload(`${filename}.${fileExtension}`, selectedFile);

    if (error) {
      setErrorMessage("Error uploading file: " + error.message);
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: file } = await supabase.storage
      .from("EX_Image")
      .getPublicUrl(data?.path);

    return file?.publicUrl; // Return the new public URL
  };

  const handleSave = async () => {
    if (
      !editingExperience.role ||
      !editingExperience.company ||
      !editingExperience.year ||
      !editingExperience.description
    ) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    // Upload the new image (if selected) and get the URL
    const newImageUrl = await handleUpload();
    if (selectedFile && !newImageUrl) {
      setErrorMessage("Failed to upload image.");
      return;
    }

    const formattedExperience = {
      ...editingExperience,
      year: Number(editingExperience.year),
      Image_url: newImageUrl || editingExperience.Image_url,
    };

    if (isNaN(formattedExperience.year) || formattedExperience.year <= 0) {
      setErrorMessage("Year must be a valid positive number.");
      return;
    }

    onSave(formattedExperience); // Call parent function to save the data
    setSuccessMessage("Experience updated successfully.");
  };

  return (
    <div className="mt-6 ">
      <h2 className="text-xl font-semibold mb-4">Edit Experience</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="role"
          value={editingExperience.role}
          onChange={(e) =>
            setEditingExperience({ ...editingExperience, role: e.target.value })
          }
          className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="company"
          value={editingExperience.company}
          onChange={(e) =>
            setEditingExperience({
              ...editingExperience,
              company: e.target.value,
            })
          }
          className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />
        <textarea
          placeholder="description"
          value={editingExperience.description}
          onChange={(e) =>
            setEditingExperience({
              ...editingExperience,
              description: e.target.value,
            })
          }
          className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />
        <input
          type="number"
          placeholder="Year"
          value={editingExperience.year}
          onChange={(e) =>
            setEditingExperience({ ...editingExperience, year: e.target.value })
          }
          className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="flex justify-end gap-3 mt-4">
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
