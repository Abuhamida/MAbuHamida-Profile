import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/app/data/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const Data = await req.json();
    console.log("Received Data:", Data); // Debug: Log incoming data

    // Validate required fields
    if (!Data.institution || !Data.degree || !Data.year) {
      return NextResponse.json({ error: "All fields (institution, degree, year) are required." });
    }

    // Insert the new project into the "projects" table
    const { data, error } = await supabase.from("education").insert([Data]);

    if (error) throw error;

    return NextResponse.json({ message: "Project added successfully!", project: data });
  } catch (error: any) {
    console.error("Error adding project:", error.message); // Debug: Log error
    return NextResponse.json({ error: error.message });
  }
}
