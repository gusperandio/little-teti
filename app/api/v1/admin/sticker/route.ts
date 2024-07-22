import { IStickerUpdate } from "@/types/interface/requests/Isticker";
import supabase from "@/lib/supabase/supabaseClient";
import { IStickerRegister } from "@/types/interface/requests/Isticker";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const stickerList = await prisma.sticker.findMany();

    if (!stickerList) {
      throw new Error("Sticker data is missing");
    }

    return new NextResponse(JSON.stringify(stickerList), {
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
    const datas = await request.formData();

    const stickerData = datas.get("sticker");
    const validFile: File | null = datas.get("file") as unknown as File;

    if (!stickerData) {
      throw new Error("Sticker data is missing");
    } else if (!validFile) {
      throw new Error("Error in file");
    }

    const sticker: IStickerRegister = JSON.parse(stickerData.toString());

    const d = new Date();
    let nameFile = `sticker/${sticker.name.split(" ")[0]}_${
      d.getMonth
    }/${d.getFullYear()}`;

    const newSticker = await prisma.sticker.create({
      data: {
        name: sticker.name,
        description: sticker.description ?? "",
        imgUrl: `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/sticker/${nameFile}
           }`,
        discount: sticker.discount,
        active: true,
      },
    });

    const { data, error } = await supabase.storage
      .from("fotos")
      .upload(nameFile, validFile);

    if (error) {
      throw new Error(error.message);
    }

    if (newSticker)
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

export async function PUT(request: Request) {
  const sticker: IStickerUpdate = await request.json();

  const stickerUpdated = await prisma.sticker.update({
    where: {
      id: sticker.id,
    },
    data: {
      name: sticker.name,
      description: sticker.description,
      discount: sticker.discount,
      active: sticker.active,
    },
  });

  if (stickerUpdated) {
    return new NextResponse(null, {
      status: 202,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { data, error } = await supabase.storage
      .from("fotos")
      .remove(["roupas/3_0_Vestido_2024"]);

    console.log(data, error);

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
