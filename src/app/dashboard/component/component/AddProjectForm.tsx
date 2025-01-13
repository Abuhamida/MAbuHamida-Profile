"use client";
import React, { useState } from "react";

export default function AddProjectForm({ onAdd }: { onAdd: (project: any) => void }) {
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

  const handleAdd = () => {
    // تحويل الحقول متعددة القيم إلى مصفوفات
    const formattedProject = {
      ...newProject,
      section: newProject.section.split(",").map((s: string) => s.trim()),
      features: newProject.features.split(",").map((f: string) => f.trim()),
      technologies: newProject.technologies.split(",").map((t: string) => t.trim()),
    };

    onAdd(formattedProject);
    // إعادة تعيين الحقول
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
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Project ID"
          value={newProject.id}
          onChange={(e) => setNewProject({ ...newProject, id: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Sections (comma separated)"
          value={newProject.section}
          onChange={(e) => setNewProject({ ...newProject, section: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Features (comma separated)"
          value={newProject.features}
          onChange={(e) => setNewProject({ ...newProject, features: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Technologies (comma separated)"
          value={newProject.technologies}
          onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProject.image}
          onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="GitHub Link"
          value={newProject.link}
          onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Details"
          value={newProject.details}
          onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Love Count"
          value={newProject.love}
          onChange={(e) =>
            setNewProject({ ...newProject, love: parseInt(e.target.value) || 0 })
          }
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </div>
    </div>
  );
}
