"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { supabase } from "@/app/data/supabaseClient";

export default function EditForm({
  award,
  onSave,
  onCancel,
}: {
  award: {
    id?: string; // Allow undefined
    title: string;
    description: string;
    year: number | string; // To allow form handling before converting to number
    Image_url: string;
  };
  onSave: (updatedAward: any) => void;
  onCancel: () => void;
}) {
  const [editingAward, setEditingAward] = useState(award);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for the selected file
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return editingAward.Image_url; // Return the existing image URL if no new file is selected
    }

    const filename = nanoid(); // Generate a unique filename
    const fileExtension = selectedFile.name.split(".").pop();

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("Awards_Image") // Replace with your bucket name
      .upload(`${filename}.${fileExtension}`, selectedFile);

    if (error) {
      setErrorMessage("Error uploading file: " + error.message);
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: file } = await supabase.storage
      .from("Awards_Image")
      .getPublicUrl(data?.path);

    return file?.publicUrl; // Return the new public URL
  };

  const handleSave = async () => {
    // Validate required fields
    if (
      !editingAward.title ||
      !editingAward.description ||
      !editingAward.year
    ) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    // Ensure `year` is a valid number
    const year = Number(editingAward.year);
    if (isNaN(year) || year < 0) {
      setErrorMessage("Year must be a valid positive number.");
      return;
    }

    // Upload the new image (if selected) and get the URL
    const newImageUrl = await handleUpload();
    if (selectedFile && !newImageUrl) {
      setErrorMessage("Failed to upload image.");
      return;
    }

    // Prepare the updated award data
    const formattedAward = {
      ...editingAward,
      year: year,
      Image_url: newImageUrl || editingAward.Image_url, // Use the new image URL or the existing one
    };

    // Call the onSave function to save the updated data
    onSave(formattedAward);

    // Show success message
    setSubmitTrue("Award updated successfully.");
  };

  return (
    <div className="mt-6 bg-mainB rounded-lg md:p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Edit Award</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={editingAward.title}
          onChange={(e) =>
            setEditingAward({ ...editingAward, title: e.target.value })
          }
          className="border px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <textarea
          placeholder="Description"
          value={editingAward.description}
          onChange={(e) =>
            setEditingAward({
              ...editingAward,
              description: e.target.value,
            })
          }
          className="border px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="number"
          placeholder="Year"
          value={editingAward.year}
          onChange={(e) =>
            setEditingAward({
              ...editingAward,
              year: e.target.value,
            })
          }
          className="border px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-secondary transition-colors duration-200"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}