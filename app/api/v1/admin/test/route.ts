import supabase from "@/lib/supabase/supabaseClient";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { data, error } = await supabase.storage
      .from("fotos")
      .remove(["roupas/3_0_Vestido_2024"]);

    console.log(data, error)

    return new NextResponse(null, {
      status: 202,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
