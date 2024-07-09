import { IProduct } from "./../../../../../types/interface/requests/Iproduct";
import * as yup from "yup";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// export interface IProduct {
//   name: string;
//   description?: string | null;
//   price: number;
//   fakePrice: number;
//   active: boolean;
//   color: string;
//   girl: number;
//   sizes: IProductSize[];
//   tags: ITags[];
// }
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
      name: yup.string().required(),
    })
  ),
});

export async function POST(request: Request) {
  try {
    const product: IProduct = await request.json();
    await productRegisterSchema.validate(product);
    
    const prisma = new PrismaClient();
     const newProduct = await prisma.product.create({
       data: {
        name : product.name, 
        description:product.description,
        price:  product.price,
        fakePrice:  product.fakePrice,
        active:  product.active,
        color:  product.name,
        girl:  product.girl,
        sizes:  product.sizes,
        tags: product.tags
       }
     })

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
