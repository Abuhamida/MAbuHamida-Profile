"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { supabase } from "@/app/data/supabaseClient";

export default function AddAwardForm({
  onAdd,
}: {
  onAdd: (award: any) => void;
}) {
  const [newAward, setNewAward] = useState<any>({
    title: "",
    description: "",
    year: "",
    Image_url: "", // Add Image_url to the state
  });

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
      setErrorMessage("Please select an image file.");
      return null;
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

    return file?.publicUrl; // Return the public URL
  };

  const handleAdd = async () => {
    // Validate required fields
    if (!newAward.title || !newAward.description || !newAward.year) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Validate year field
    const year = Number(newAward.year);
    if (isNaN(year) || year <= 0) {
      setErrorMessage("Year must be a valid positive number.");
      return;
    }

    // Upload the image and get the URL
    const imageUrl = await handleUpload();
    if (!imageUrl) {
      setErrorMessage("Failed to upload image.");
      return;
    }

    // Prepare the award data with the image URL
    const awardData = {
      ...newAward,
      year: year,
      Image_url: imageUrl, // Add the image URL to the award data
    };

    // Call the onAdd function to save the award data
    onAdd(awardData);

    // Show success message
    setSubmitTrue("Award added successfully");

    // Reset the form
    setNewAward({
      title: "",
      description: "",
      year: "",
      Image_url: "",
    });
    setSelectedFile(null); // Clear the selected file
  };

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
        <input
          type="file"
          onChange={handleFileChange}
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