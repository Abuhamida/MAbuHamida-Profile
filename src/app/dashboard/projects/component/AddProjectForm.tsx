"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { supabase } from "@/app/data/supabaseClient";

export default function AddProjectForm({
  onAdd,
}: {
  onAdd: (project: any) => void;
}) {
  const [newProject, setNewProject] = useState<any>({
    id: "",
    section: "",
    title: "",
    description: "",
    features: "",
    image: "",
    link: "",
    technologies: "",
    details: "",
    love: 0,
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
      return;
    }

    const filename = nanoid(); // Generate a unique filename
    const fileExtension = selectedFile.name.split(".").pop();

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("projectsImage") // Replace with your bucket name
      .upload(`${filename}.${fileExtension}`, selectedFile);

    if (error) {
      setErrorMessage("Error uploading file: " + error.message);
      return;
    }

    // Get the public URL of the uploaded file
    const { data: file } = await supabase.storage
      .from("projectsImage")
      .getPublicUrl(data?.path);

    return file?.publicUrl; // Return the public URL
  };

  const handleAdd = async () => {
    // Check for required fields
    if (
      !newProject.id ||
      !newProject.section ||
      !newProject.title ||
      !newProject.description ||
      !newProject.features ||
      !newProject.link ||
      !newProject.technologies ||
      !newProject.details
    ) {
      setErrorMessage("Please Fill All Fields");
      return;
    }

    // Upload the image and get the URL
    const imageUrl = await handleUpload();
    if (!imageUrl) {
      setErrorMessage("Failed to upload image.");
      return;
    }

    // Format the project data
    const formattedProject = {
      ...newProject,
      section: newProject.section.split(",").map((s: string) => s.trim()),
      features: newProject.features.split(",").map((f: string) => f.trim()),
      technologies: newProject.technologies
        .split(",")
        .map((t: string) => t.trim()),
      image: imageUrl, // Use the uploaded image URL
    };

    // Call the onAdd function to save the project
    onAdd(formattedProject);

    // Reset the form
    setSubmitTrue("Project Added Successfully");
    setNewProject({
      id: "",
      section: "",
      title: "",
      description: "",
      features: "",
      image: "",
      link: "",
      technologies: "",
      details: "",
      love: 0,
    });
    setSelectedFile(null); // Clear the selected file
  };

  return (
    <div className="mb-6 text-primary">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Project</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-5 w-full justify-center items-center">
          <input
            type="text"
            placeholder="Project ID"
            value={newProject.id}
            onChange={(e) =>
              setNewProject({ ...newProject, id: e.target.value })
            }
            className="border px-4 py-2 rounded w-full bg-mainB text-white"
          />
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="border px-4 py-2 rounded w-full bg-mainB text-white"
          />
        </div>

        <textarea
          placeholder="Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          className="border px-4 py-2 rounded bg-mainB text-white"
        />
        <input
          type="text"
          placeholder="Sections (comma separated)"
          value={newProject.section}
          onChange={(e) =>
            setNewProject({ ...newProject, section: e.target.value })
          }
          className="border px-4 py-2 rounded bg-mainB text-white"
        />
        <input
          type="text"
          placeholder="Features (comma separated)"
          value={newProject.features}
          onChange={(e) =>
            setNewProject({ ...newProject, features: e.target.value })
          }
          className="border px-4 py-2 rounded bg-mainB text-white"
        />
        <input
          type="text"
          placeholder="Technologies (comma separated)"
          value={newProject.technologies}
          onChange={(e) =>
            setNewProject({ ...newProject, technologies: e.target.value })
          }
          className="border px-4 py-2 rounded bg-mainB text-white"
        />
        <div className="flex justify-center items-center gap-5">
          <input
            type="file"
            onChange={handleFileChange}
            className="border px-4 py-2 rounded w-full bg-mainB text-white"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={newProject.link}
            onChange={(e) =>
              setNewProject({ ...newProject, link: e.target.value })
            }
            className="border px-4 py-2 rounded w-full bg-mainB text-white"
          />
        </div>

        <textarea
          placeholder="Details"
          value={newProject.details}
          onChange={(e) =>
            setNewProject({ ...newProject, details: e.target.value })
          }
          className="border px-4 py-2 rounded bg-mainB text-white"
        />
        <div className="flex gap-5 justify-center items-center">
          <div className="flex justify-start items-center gap-3 w-full">
            <label htmlFor="" className="text-white">
              Love Count
            </label>
            <input
              type="number"
              placeholder="Love Count"
              value={newProject.love}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  love: parseInt(e.target.value) || 0,
                })
              }
              className="border px-4 py-2 rounded bg-mainB text-white"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-center items-end">
            <button
              onClick={handleAdd}
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-box-gradient-2 transition duration-200"
            >
              Add Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}