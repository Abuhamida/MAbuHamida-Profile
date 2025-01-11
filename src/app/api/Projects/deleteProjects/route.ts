import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/app/data/supabaseClient";

export async function DELETE(req: NextRequest, ) {
    try {
      const { projectId } = await req.json(); // Get the projectId from the request query params
  
      if (!projectId) {
        return NextResponse.json({ error: "Project ID is required" });
      }
  
      // Delete the project from the "projects" table
      const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);
  
      if (error) throw error;
  
      return NextResponse.json({ message: "Project deleted successfully!" });
    } catch (error: any) {
      return NextResponse.json({ error: error.message });
    }
  }