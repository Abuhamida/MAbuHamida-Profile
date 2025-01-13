import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/app/data/supabaseClient";

export async function DELETE(req: NextRequest) {
  try {
    const id = await req.json(); // Get the projectId from the request query params
    const Id = id.id;
    if (!Id) {
      return NextResponse.json({ error: "services ID is required" });
    }

    // Delete the project from the "projects" table
    const { data, error } = await supabase
      .from("services")
      .delete()
      .eq("id", Id);

    if (error) throw error;

    return NextResponse.json({ message: "Project deleted successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
