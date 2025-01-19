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
    setSubmitTrue("Project Updated Successfully");
  };

  return (
    <div className="mx-auto rounded-lg shadow-lg bg-mainB">
      <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
        Edit Project
      </h2>
      <div className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={editingProject.title}
            onChange={(e) =>
              setEditingProject({ ...editingProject, title: e.target.value })
            }
            className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={editingProject.description}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                description: e.target.value,
              })
            }
            className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            rows={4}
          />
        </div>
        <div>
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
            className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div>
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
                features: e.target.value
                  .split(",")
                  .map((f: string) => f.trim()),
              })
            }
            className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div>
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
            className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="Image URL"
              value={editingProject.image}
              onChange={(e) =>
                setEditingProject({ ...editingProject, image: e.target.value })
              }
              className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="GitHub Link"
              value={editingProject.link}
              onChange={(e) =>
                setEditingProject({ ...editingProject, link: e.target.value })
              }
              className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <div>
          <textarea
            placeholder="Details"
            value={editingProject.details}
            onChange={(e) =>
              setEditingProject({ ...editingProject, details: e.target.value })
            }
            className="w-full p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            rows={4}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label htmlFor="love" className="text-lg text-white">
              Love Count
            </label>
            <input
              id="love"
              type="number"
              placeholder="Love Count"
              value={editingProject.love}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  love: parseInt(e.target.value) || 0,
                })
              }
              className="p-3 border rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary w-full sm:w-auto"
            />
          </div>
          <div className="flex space-x-4 w-full sm:w-auto">
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
    </div>
  );
}
