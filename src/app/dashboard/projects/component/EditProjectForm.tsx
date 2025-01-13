"use client";
import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function EditProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project: any;
  onSave: (updatedProject: any) => void;
  onCancel: () => void;
}) {
  const [editingProject, setEditingProject] = useState(project);
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
  const handleSave = () => {
    if (
      !editingProject.id ||
      !editingProject.section ||
      !editingProject.title ||
      !editingProject.description ||
      !editingProject.features ||
      !editingProject.image ||
      !editingProject.link ||
      !editingProject.technologies ||
      !editingProject.details
    ) {
      setErrorMessage("Please Fill All Fields");
      return;
    }

    const formattedProject = {
      ...editingProject,
      section: Array.isArray(editingProject.section)
        ? editingProject.section
        : editingProject.section.split(",").map((s: string) => s.trim()),
      features: Array.isArray(editingProject.features)
        ? editingProject.features
        : editingProject.features.split(",").map((f: string) => f.trim()),
      technologies: Array.isArray(editingProject.technologies)
        ? editingProject.technologies
        : editingProject.technologies.split(",").map((t: string) => t.trim()),
    };

    onSave(formattedProject);
    setSubmitTrue("Project Update Successfully");
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={editingProject.title}
          onChange={(e) =>
            setEditingProject({ ...editingProject, title: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={editingProject.description}
          onChange={(e) =>
            setEditingProject({
              ...editingProject,
              description: e.target.value,
            })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Sections (comma separated)"
          value={
            Array.isArray(editingProject.section)
              ? editingProject.section.join(", ")
              : editingProject.section
          }
          onChange={(e) =>
            setEditingProject({
              ...editingProject,
              section: e.target.value.split(",").map((s: string) => s.trim()),
            })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Features (comma separated)"
          value={
            Array.isArray(editingProject.features)
              ? editingProject.features.join(", ")
              : editingProject.features
          }
          onChange={(e) =>
            setEditingProject({
              ...editingProject,
              features: e.target.value.split(",").map((f: string) => f.trim()),
            })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Technologies (comma separated)"
          value={
            Array.isArray(editingProject.technologies)
              ? editingProject.technologies.join(", ")
              : editingProject.technologies
          }
          onChange={(e) =>
            setEditingProject({
              ...editingProject,
              technologies: e.target.value
                .split(",")
                .map((t: string) => t.trim()),
            })
          }
          className="border px-4 py-2 rounded"
        />
        <div className="flex gap-5 justify-center items-center w-full">
          <input
            type="text"
            placeholder="Image URL"
            value={editingProject.image}
            onChange={(e) =>
              setEditingProject({ ...editingProject, image: e.target.value })
            }
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={editingProject.link}
            onChange={(e) =>
              setEditingProject({ ...editingProject, link: e.target.value })
            }
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <textarea
          placeholder="Details"
          value={editingProject.details}
          onChange={(e) =>
            setEditingProject({ ...editingProject, details: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <div className="flex gap-5 w-full justify-center items-center">
          <div className="w-full flex gap-3 justify-start items-center">
            <label htmlFor="">Love Count</label>
            <input
              type="number"
              placeholder="Love Count"
              value={editingProject.love}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  love: parseInt(e.target.value) || 0,
                })
              }
              className="border px-4 py-2 rounded"
            />
          </div>
          <div className="mt-4 w-full flex gap-3 justify-end items-center ">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
