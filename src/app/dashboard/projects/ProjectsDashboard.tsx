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

export default function ProjectsDashboard({
  closeSection,
}: ProjectsDashboardProps) {
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
    <div className="md:p-6 w-full bg-mainB text-primary min-h-screen">
      <div className="flex justify-between items-center mb-5 w-full fixed top-0 left-0 px-2 md:px-8 py-4 bg-gradient-to-r from-[#010101] to-[#191717] text-white z-10">
        <button
          onClick={closeSection}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary transition duration-200"
        >
          Close 
        </button>
        <h1 className="md:text-2xl font-bold">Projects Dashboard</h1>
        {add ? (
          <button
            onClick={() => setAdd(false)}
            className="px-4 py-2 bg-primary text-mainB rounded-lg hover:border border-secondary hover:text-secondary hover:bg-box-gradient-2 transition-colors duration-200"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setAdd(true)}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:border border-secondary hover:text-secondary hover:bg-box-gradient-2 transition-colors duration-200"
          >
            Add 
          </button>
        )}
      </div>

      {error && <p className="text-secondary mt-16 mb-4">{error}</p>}
      {/* Add Project Form */}
      <div className="w-full flex flex-col  justify-center items-start gap-5 pt-20 ">
        {(add || editingProject) && (
          <div className="w-full ">
            {add && <AddProjectForm onAdd={addProject} />}
            {!add && editingProject && (
              <EditProjectForm
                project={editingProject}
                onSave={updateProject}
                onCancel={() => setEditingProject(null)}
              />
            )}
          </div>
        )}

        <div className="w-full ">
          <ProjectList
            projects={projects}
            onEdit={(project) => {
              setEditingProject(project);
              setAdd(false); // Hide the Add Project Form when editing
            }}
            onDelete={deleteProject}
          />
        </div>
      </div>
    </div>
  );
}
