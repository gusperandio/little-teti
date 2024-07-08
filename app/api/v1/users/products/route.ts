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

export async function POST() {
  const prisma = new PrismaClient();
  
  const newUser = await prisma.user.create({
    data: {name : "Gustavo", email : "gustavo.sperandio25@gmail.com", password : "password"}
  })


  return new NextResponse(JSON.stringify({ user: newUser }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT() {
  return new NextResponse(JSON.stringify({ status: "PUT" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE() {
  return new NextResponse(JSON.stringify({ status: "DELETE" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
