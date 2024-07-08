import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return new NextResponse(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        name: true,
        email: true,
        cpf: true,
        phone: true,
      },
    });

    return new NextResponse(JSON.stringify(user), {
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

export async function POST(request: Request) {
  try {
    let { name, email, password } = await request.json();

    const newUser = await prisma.user.create({
      data: { name: name!, email: email, password: password },
    });

    if (!newUser)
      return new NextResponse(JSON.stringify({ user: "Not Created" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });

    return new NextResponse(JSON.stringify({ user: "Created" }), {
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

export async function PUT(request: Request) {
  try {
    const { id, name, email, phone, cpf } = await request.json();
    if (!id) {
      return new NextResponse(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, phone, cpf },
    });

    if (!updatedUser)
      return new NextResponse(JSON.stringify({ user: "Not Changed" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });

    return new NextResponse(JSON.stringify({ user: "Changed" }), {
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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return new NextResponse(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const deleteUser = await prisma.user.delete({
      where: { id },
    });

    if (!deleteUser)
      return new NextResponse(JSON.stringify({ user: "Not Deleted" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });

    return new NextResponse(JSON.stringify({ user: "Deleted" }), {
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
