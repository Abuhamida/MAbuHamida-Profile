"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { supabase } from "@/app/data/supabaseClient";
export default function AddExperienceForm({
  onAdd,
}: {
  onAdd: (Experience: any) => void;
}) {
  const [newExperience, setNewExperience] = useState<any>({
    role: "",
    company: "",
    year: "",
    description: "",
    Image_url: "",
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
    if (
      !newExperience.role ||
      !newExperience.company ||
      !newExperience.year ||
      !newExperience.description
    ) {
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
    const experienceData = {
      ...newExperience,
      Image_url: imageUrl, // Add the image URL to the Edu data
    };

    onAdd(experienceData);

    setSubmitTrue("Experience added successfully");
    setNewExperience({
      role: "",
      company: "",
      year: "",
      description: "",
    });
  };

  return (
    <div className="mb-6 ">
      <h2 className="text-xl font-semibold mb-4">Add New Experience</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Experience role"
          value={newExperience.role}
          onChange={(e) =>
            setNewExperience({ ...newExperience, role: e.target.value })
          }
          className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Experience Company"
          value={newExperience.company}
          onChange={(e) =>
            setNewExperience({ ...newExperience, company: e.target.value })
          }
          className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />
        <textarea
          placeholder="Description"
          value={newExperience.description}
          onChange={(e) =>
            setNewExperience({ ...newExperience, description: e.target.value })
          }
          className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />

        <input
          type="year"
          placeholder="Year"
          value={newExperience.year}
          onChange={(e) =>
            setNewExperience({ ...newExperience, year: e.target.value })
          }
          className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="border border-primary px-4 py-2 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <div className="flex justify-end items-center">
          <button
            onClick={handleAdd}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-box-gradient-2 transition duration-200"
          >
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
}
