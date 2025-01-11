// pages/api/projects/love.ts
import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/app/data/supabaseClient";

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { projectId, userId } = await req.json(); // Get the project ID from query parameters

    if (!projectId || !userId) {
      return NextResponse.json({
        error: "Project ID and User ID are required",
      });
    }

    // Check if the user has already loved this project
    const { data: lovedProject, error: fetchError } = await supabase
      .from("loved_projects")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .single();

    if (fetchError) throw fetchError;

    // Toggle the love count in the "projects" table and manage the loved_projects table
    let updatedData;
    if (lovedProject) {
      // If the user already loved the project, "unlove" it
      updatedData = await supabase
        .from("projects")
        .update({ love: "love - 1" })
        .eq("id", projectId);

      await supabase
        .from("loved_projects")
        .delete()
        .eq("project_id", projectId)
        .eq("user_id", userId);
    } else {
      // If the user hasn't loved the project yet, "love" it
      updatedData = await supabase
        .from("projects")
        .update({ love: "love - 1" })
        .eq("id", projectId);

      await supabase
        .from("loved_projects")
        .insert([{ project_id: projectId, user_id: userId }]);
    }

    if (updatedData.error) throw updatedData.error;

    return NextResponse.json({ message: "Love toggled successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
