"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { supabase } from "@/app/data/supabaseClient";

export default function AddEduForm({ onAdd }: { onAdd: (Edu: any) => void }) {
  const [newEdu, setNewEdu] = useState<any>({
    institution: "",
    degree: "",
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

    return file?.publicUrl; // Return the public URL
  };

  const handleAdd = async () => {
    // Validate required fields
    if (!newEdu.institution || !newEdu.degree || !newEdu.year) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Upload the image and get the URL
    const imageUrl = await handleUpload();
    if (!imageUrl) {
      setErrorMessage("Failed to upload image.");
      return;
    }

    // Prepare the Edu data with the image URL
    const eduData = {
      ...newEdu,
      Image_url: imageUrl, // Add the image URL to the Edu data
    };

    // Call the onAdd function to save the Edu data
    onAdd(eduData);

    // Show success message
    setSubmitTrue("Edu added successfully");

    // Reset the form
    setNewEdu({
      institution: "",
      degree: "",
      year: "",
      Image_url: "",
    });
    setSelectedFile(null); // Clear the selected file
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Add New Education
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Institution Name"
          value={newEdu.institution}
          onChange={(e) =>
            setNewEdu({ ...newEdu, institution: e.target.value })
          }
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <textarea
          placeholder="Degree"
          value={newEdu.degree}
          onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="text"
          placeholder="Year"
          value={newEdu.year}
          onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="w-full flex flex-col justify-center items-center">
          <button
            onClick={handleAdd}
            className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-[#c80036] transition-colors"
          >
            Add Edu
          </button>
        </div>
      </div>
    </div>
  );
}