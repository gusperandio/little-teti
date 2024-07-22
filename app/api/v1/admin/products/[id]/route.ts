import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
type Identity = {
  id: number;
};
export async function GET(request: Request, context: { params: Identity }) {
  try {
    const id = context.params.id;

    if (!id) {
      throw new Error("Error");
    }

    const product = await prisma.product.findFirstOrThrow({
      include: {
        images: true,
        category: true,
        tags: true,
        sizes: true,
      },
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      throw new Error("Product doesn't exists.");
    }

    const { category, tags, sizes, images, ...rest } = product;
    const productWithImageUrl = {
      ...rest,
      categoryName: category.categoryName,
      tags: product.tags.map((tag) => tag.tagName),
      sizes: product.sizes.map((size) => {
        const { id, productId, ...restSize } = size;
        return restSize;
      }),
      images: product.images.map((image) => image.imageUrl),
    };

    if (!productWithImageUrl) {
      throw new Error("Product data is missing");
    }

    return new NextResponse(JSON.stringify(productWithImageUrl), {
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

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    const changeProduct = await request.json();

    const product = await prisma.product.findFirstOrThrow({
      include: {
        images: true,
        category: true,
        tags: true,
        sizes: true,
      },
      where: {
        id: Number(id),
      },
    });

    if (!id) {
      throw new Error("Error");
    }

    return new NextResponse(JSON.stringify({ status: "PUT" }), {
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
    const { id } = params;

    if (!id) {
      throw new Error("Error");
    }

    const deleted = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleted) throw new Error("Error to delete");

    return new NextResponse(JSON.stringify({ status: "DELETE" }), {
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
