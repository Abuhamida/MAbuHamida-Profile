// PUT method to update a project by ID
import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/app/data/supabaseClient";
export async function PUT(req: NextRequest) {
  try {
    // Get the projectId from the request query params
    const updatedData= await req.json(); // Get the updated project data from the request body
    const Id = updatedData.id;

    if (!Id) {
      return NextResponse.json({ error: "Project ID is required" });
    }

    // Update the project in the "projects" table
    const { data, error } = await supabase
      .from("awards")
      .update(updatedData)
      .eq("id",Id);

    if (error) throw error;

    return NextResponse.json({
      message: "Project updated successfully!",
      project: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
