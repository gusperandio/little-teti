import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const user = await supabase.auth.signInWithPassword({
    email: "gustavo.sperandio25@gmail.com",
    password: "@Goprontera1",
  });

  return new NextResponse(
    JSON.stringify({ user: user }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
