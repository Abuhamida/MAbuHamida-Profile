// pages/api/projects.ts
import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/app/data/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase.from("services").select("*");

    if (error) {
      console.error("Error fetching education:", error.message);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
