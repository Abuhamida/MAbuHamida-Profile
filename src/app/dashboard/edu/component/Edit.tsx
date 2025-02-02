"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { supabase } from "@/app/data/supabaseClient";

export default function EditForm({
  edu,
  onSave,
  onCancel,
}: {
  edu: {
    id: string;
    institution: string;
    degree: string;
    year: number | string;
    Image_url: string;
  };
  onSave: (updatedEdu: any) => void;
  onCancel: () => void;
}) {
  const [editingEdu, setEditingEdu] = useState(edu);
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
      return editingEdu.Image_url; // Return the existing image URL if no new file is selected
    }

    const filename = nanoid(); // Generate a unique filename
    const fileExtension = selectedFile.name.split(".").pop();

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("EDU_image") // Replace with your bucket name
      .upload(`${filename}.${fileExtension}`, selectedFile);

    if (error) {
      setErrorMessage("Error uploading file: " + error.message);
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: file } = await supabase.storage
      .from("EDU_image")
      .getPublicUrl(data?.path);

    return file?.publicUrl; // Return the new public URL
  };

  const handleSave = async () => {
    // Validate required fields
    if (!editingEdu.institution || !editingEdu.degree || !editingEdu.year) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    // Validate year field
    const year = Number(editingEdu.year);
    if (isNaN(year) || year <= 0) {
      setErrorMessage("Year must be a valid positive number.");
      return;
    }

    // Upload the new image (if selected) and get the URL
    const newImageUrl = await handleUpload();
    if (selectedFile && !newImageUrl) {
      setErrorMessage("Failed to upload image.");
      return;
    }

    // Prepare the updated education data
    const formattedEdu = {
      ...editingEdu,
      year: year,
      Image_url: newImageUrl || editingEdu.Image_url, // Use the new image URL or the existing one
    };

    // Call the onSave function to save the updated data
    onSave(formattedEdu);

    // Show success message
    setSuccessMessage("Education updated successfully.");
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Edit Education</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Institution"
          value={editingEdu.institution}
          onChange={(e) =>
            setEditingEdu({ ...editingEdu, institution: e.target.value })
          }
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <textarea
          placeholder="Degree"
          value={editingEdu.degree}
          onChange={(e) =>
            setEditingEdu({ ...editingEdu, degree: e.target.value })
          }
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="number"
          placeholder="Year"
          value={editingEdu.year}
          onChange={(e) =>
            setEditingEdu({ ...editingEdu, year: e.target.value })
          }
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-[#c80036] transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}