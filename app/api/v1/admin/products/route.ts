import { IProduct } from "./../../../../../types/interface/requests/Iproduct";
import * as yup from "yup";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase/supabaseClient";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const productsList = await prisma.product.findMany({
      include: {
        images: true,
      },
    });

    const productsWithImageUrls = productsList.map(product => ({
      ...product,
      images: product.images.map(image => image.imageUrl),
    }));

    if (!productsWithImageUrls) {
      throw new Error("Product data is missing");
    }

    return new NextResponse(JSON.stringify(productsWithImageUrls), {
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
    const data = await request.formData();

    const productData = data.get("product");
    const validFiles = data
      .getAll("files")
      .filter((file) => file instanceof File) as File[];

    if (!productData) {
      throw new Error("Product data is missing");
    } else if (!validFiles) {
      throw new Error("Error in file");
    }

    const product: IProduct = JSON.parse(productData.toString());

    const productRegisterSchema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string(),
      price: yup.number().required().positive(),
      fakePrice: yup.number().required().positive(),
      active: yup.bool().required(),
      color: yup.string().required(),
      girl: yup.bool().required(),
      sizes: yup.array().of(
        yup.object().shape({
          sizeName: yup.string().required(),
          amount: yup.number().required().positive(),
        })
      ),
      tags: yup.array().of(
        yup.object().shape({
          tagName: yup.string().required(),
        })
      ),
      category: yup.number().required().positive(),
    });

    await productRegisterSchema.validate(product);

    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        fakePrice: product.fakePrice,
        active: product.active,
        color: product.name,
        girl: product.girl,
        sizes: {
          create: product.sizes.map((size) => ({
            sizeName: size.sizeName,
            amount: size.amount,
          })),
        },
        tags: {
          create: product.tags.map((tag) => ({
            tagName: tag.tagName,
          })),
        },
        category: {
          connect: {
            id: product.category,
          },
        },
      },
    });

    for (let i = 0; i < validFiles.length; i++) {
      const d = new Date();

      let nameFile = `roupas/${newProduct.id}_${i}_${
        newProduct.name.split(" ")[0]
      }_${d.getFullYear()}`;

      const { data, error } = await supabase.storage
        .from("fotos")
        .upload(nameFile, validFiles[i]);

      if (error) {
        throw new Error(error.message);
      }

      const insertImage = await prisma.productImage.create({
        data: {
          productId: newProduct.id,
          imageUrl: `${process.env
            .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${
            data.fullPath
          }`,
        },
      });

      if (!insertImage) {
        throw new Error("Error to insert image on BD");
      }
    }

    if (newProduct)
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
