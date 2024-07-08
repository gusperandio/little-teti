import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import supabase from "@/lib/supabase/supabaseClient"; 

export async function POST() {

  const { data, error } = await supabase.storage.from("fotos").list("");

  if (error) {
    return new NextResponse(JSON.stringify({ response: "ERROR" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const fileUrls = data.map((file) => {
    const publicUrl = supabase.storage.from("fotos").getPublicUrl(file.name);
    if (!publicUrl.data.publicUrl.includes(".emptyFolderPlaceholder")) return publicUrl.data.publicUrl;    
  });

  return new NextResponse(JSON.stringify({ fileUrls }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
