"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ChipNew } from "../components/chipNew";
import { CardsInit } from "@/components/cardsInit";

export default function Home() {
  const list = [
    {
      title: "Orange",
      img: "/images/image1.jpeg",
      price: "R$ 5.50",
      fakePrice: "R$ 62.50",
    },
    {
      title: "Tangerine",
      img: "/images/image2.jpeg",
      price: "R$ 3.00",
      fakePrice: "R$ 62.50",
    },
    {
      title: "Raspberry",
      img: "/images/image3.jpeg",
      price: "$R 10.00",
      fakePrice: "R$ 62.50",
    },
    {
      title: "Lemon",
      img: "/images/image4.jpeg",
      price: "R$ 5.30",
      fakePrice: "R$ 62.50",
    },
    {
      title: "Avocado",
      img: "/images/image5.jpeg",
      price: "$R 25.70",
      fakePrice: "R$ 62.50",
    },
    {
      title: "Lemon 2",
      img: "/images/image6.jpeg",
      price: "R$ 28.00",
      fakePrice: "R$ 62.50",
    },
    {
      title: "Banana",
      img: "/images/image7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/image1.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="flex justify-center sm:grid-cols-4">
        <CardsInit />
      </div>
      <br />
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0 h-60 relative flex items-end">
              <ChipNew />
              <Image
                isZoomed
                shadow="sm"
                radius="none"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[210px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between font-normal">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
