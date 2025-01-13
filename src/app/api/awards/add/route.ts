import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/app/data/supabaseClient";

export async function POST(req: NextRequest) {
    try {
      const Data = await req.json(); // Get the project data from the request body
  
      // Insert the new project into the "projects" table
      const { data, error } = await supabase
        .from("awards")
        .insert([Data]);
  
      if (error) throw error;
  
      return NextResponse.json({ message: "Project added successfully!", project: data });
    } catch (error: any) {
      return NextResponse.json({ error: error.message });
    }
  }