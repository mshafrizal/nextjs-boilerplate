"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function HomeAward() {
  const t = useTranslations("Home");
  const [clientIp, setClient] = useState();
  const awards = [
    {
      img_url: "/images/award-1.png",
      title:
        "Traveler Choice Award, Rank #18  Top 25 Luxury Hotels - Asia by Tripadvisor in 2024",
    },
    {
      img_url: "/images/award-2.png",
      title:
        "Traveler Choice Award, Rank #18  Top 25 Luxury Hotels - Asia by Tripadvisor in 2023",
    },
    {
      img_url: "/images/award-3.png",
      title: "Rank #2 Family Resort in Bali by Holidays with Kids in 2023",
    },
  ];

  useEffect(() => {
    // GET https://ipapi.co/{format}/
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => setClient(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <section id="award" className="bg-neutral-200 py-10 mt-10">
      <div className="flex flex-col gap-4 container px-6 sm:px-0 mx-auto xl:max-w-[1040px]">
        <h2 className={"h2 uppercase"}>{t("award")}</h2>
        <pre className="text-xs">{JSON.stringify(clientIp, null, 2)}</pre>
        <Carousel
          className="w-full"
          id="home-award-carousel"
          data-testid="home-award-carousel"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="gap-4 px-4">
            {awards.map((award, i) => {
              return (
                <CarouselItem
                  key={i}
                  className="p-6 flex gap-2 items-center bg-white border border-neutral-200 rounded-md basis-full md:basis-1/2 lg:basis-[336px]"
                >
                  <Image
                    src={award.img_url}
                    alt={award.title}
                    height={56}
                    width={56}
                  />
                  <p className="text-neutral-600">{award.title}</p>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            className="-left-4 shadow-xl bg-white hover:bg-yellow-00 disabled:bg-white text-neutral-900 disabled:text-neutral-900 disabled:cursor-not-allowed! border-0 h-11 w-11"
            iconClassName="size-6 text-neutral-900"
          />
          <CarouselNext
            className="-right-4 shadow-xl bg-white hover:bg-yellow-00 disabled:bg-white text-neutral-900 disabled:text-neutral-900 disabled:cursor-not-allowed! border-0 h-11 w-11"
            iconClassName="size-6 text-neutral-900"
          />
        </Carousel>
      </div>
    </section>
  );
}
