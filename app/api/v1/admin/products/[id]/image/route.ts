import { IProductRequest } from "@/types/interface/requests/Iproduct";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const data = await request.formData();

    const validFiles = data
      .getAll("files")
      .filter((file) => file instanceof File) as File[];

    if (!validFiles) {
      throw new Error("Error in file");
    }

    return new NextResponse(JSON.stringify({ ok: true }), {
      status: 200,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const data = await request.formData();

    const validFiles = data
      .getAll("files")
      .filter((file) => file instanceof File) as File[];

    if (!validFiles) {
      throw new Error("Error in file");
    }

    return new NextResponse(JSON.stringify({ ok: true }), {
      status: 200,
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
