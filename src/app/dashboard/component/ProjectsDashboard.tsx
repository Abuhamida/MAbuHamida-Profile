"use client";
import React, { useState, useEffect } from "react";
import AddProjectForm from "./component/AddProjectForm";
import ProjectList from "./component/ProjectList";
import EditProjectForm from "./component/EditProjectForm";

interface Project {
  id: string;
  section: string[];
  title: string;
  description: string;
  features: string[];
  image: string;
  link: string;
  technologies: string[];
  details: string;
  love: number;
}

interface ProjectsDashboardProps {
  closeSection: () => void;
}


export default function ProjectsDashboard( {closeSection}:ProjectsDashboardProps ) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [add, setAdd] = useState(false);

  // Fetch projects from the API
  const getProjects = async () => {
    try {
      const response = await fetch("/api/Projects/getProjects");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects");
    }
  };

  // Add a new project
  const addProject = async (newProject: Project) => {
    try {
      const response = await fetch("/api/Projects/addProjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) throw new Error("Failed to add project");
      getProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      setError("Failed to add project");
    }
  };

  // Update an existing project
  const updateProject = async (updatedProject: Project) => {
    try {
      const response = await fetch("/api/Projects/updateProject", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
      if (!response.ok) throw new Error("Failed to update project");
      setEditingProject(null);
      getProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      setError("Failed to update project");
    }
  };

  // Delete a project by ID
  const deleteProject = async (id: string) => {
    try {
      const response = await fetch("/api/Projects/deleteProjects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete project");
      getProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project");
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-5 w-full">
      <button
        onClick={closeSection}
        className=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close Section
      </button>
        <h1 className="text-2xl font-bold">Projects Dashboard </h1>
        {add ? (
          <button
            onClick={() => setAdd(false)}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:border border-secondary hover:text-secondary hover:bg-white transition-colors duration-200"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setAdd(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:border border-green-600 hover:text-green-600 hover:bg-white transition-colors duration-200"
          >
            Add New Project
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Add Project Form */}
      {add && <AddProjectForm onAdd={addProject} />}

      {/* Edit Project Form */}
      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onSave={updateProject}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {/* Project List */}
      <ProjectList
        projects={projects}
        onEdit={(project) => {
          setEditingProject(project);
          setAdd(false); // Hide the Add Project Form when editing
        }}
        onDelete={deleteProject}
      />
    </div>
  );
}
