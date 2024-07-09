import supabase from "@/lib/supabase/supabaseClient";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.auth.signUp({
    email: "example@example.com",
    password: "example-password",
  });

  console.log(data, error);
  return new NextResponse(JSON.stringify({ status: "GET" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

