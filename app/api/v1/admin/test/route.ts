import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const files = data.getAll("files");

    const validFiles = files.filter((file) => file instanceof File) as File[];

    if (!validFiles)
      return new NextResponse("Error in file!", {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });

    for (let i = 0; i < validFiles.length; i++) {
      const { data, error } = await supabase.storage
        .from("fotos")
        .upload(validFiles[i].name, validFiles[i]);
        console.log(data)
    }
    return new NextResponse("Route OK", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {}
}
