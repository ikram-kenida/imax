import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axiosClient from "@/axios";

export const Footer = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "footer",
  });
  const links: any[] = t("links", { returnObjects: true });
  const [images, setImages] = useState([]);

  const fetcher = async () => {
    try {
      const { data } = await axiosClient.get("/images_footer");
      setImages(data.images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between flex-wrap gap-y-8">
        <div className="xl:w-[425px] w-full">
          <div className="flex flex-col justify-between items-start gap-5">
            <div className="flex flex-col items-start gap-7">
              <img
                src="/images/logo-2.png"
                alt="logo"
                width={127}
                height={93}
              />
              <div className="relative pt-2 ps-2">
                <img
                  src="/icons/quote.svg"
                  alt="quote"
                  width={16}
                  height={16}
                  className="absolute top-0 left-0"
                />
                <p className="text-white/60 text-sm font-normal capitalize leading-[26px]">
                  {t("description")}
                </p>
                <img
                  src="/icons/quote.svg"
                  alt="quote"
                  width={16}
                  height={16}
                  className="absolute bottom-0 right-1/2 rotate-180"
                />
              </div>
            </div>
            <div className="flex">
              <a
                href="https://www.instagram.com/imaxstore34?igsh=cHpvdnpsZWVucWNq"
                target="_blank"
                className="w-[104px] p-2 gap-2 rounded-[250px] border border-neutral-700 flex justify-center items-center"
              >
                <span className="text-white text-xs capitalize font-medium">
                  Instagram
                </span>
                <img
                  src="/icons/instagram.svg"
                  alt="instagram"
                  width={14}
                  height={14}
                />
              </a>
              <a
                href="https://www.facebook.com/imaxstore34?mibextid=ZbWKwL"
                target="_blank"
                className="w-[104px] p-2 gap-2 rounded-[250px] border border-neutral-700 flex justify-center items-center"
              >
                <span className="text-white text-xs capitalize font-medium">
                  Facebook
                </span>
                <img
                  src="/icons/facebook.svg"
                  alt="facebook"
                  width={14}
                  height={14}
                />
              </a>
              <a
                href="https://wa.me/213778308152"
                target="_blank"
                className="w-[104px] p-2 gap-2 rounded-[250px] border border-neutral-700 flex justify-center items-center"
              >
                <span className="text-white text-xs capitalize font-medium">
                  whatsapp
                </span>
                <img
                  src="/icons/whatsapp.svg"
                  alt="whatsapp"
                  width={15}
                  height={15}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="xl:w-[266px] md:w-1/2">
          <h5 className="text-white text-lg font-semibold capitalize pb-2 relative before:absolute before:bg-blue-600 before:w-[9px] before:h-[3px] before:rounded-md before:start-0 before:bottom-0  after:absolute after:bg-blue-600 after:w-[116px] after:h-[3px] after:rounded-md after:start-4 after:bottom-0">
            About Platform
          </h5>
          <ul className="flex flex-col gap-5 mt-8">
            {links.map((link) => (
              <li className="relative" key={link.name}>
                <Link className="flex items-center gap-1" to={link.path}>
                  <img
                    src="/icons/arrow-right-2.svg"
                    alt="arrow-right"
                    width={6}
                    height={8}
                    className="ltr:rotate-0 rtl:rotate-180"
                  />
                  <span className="text-white/85 text-sm capitalize font-medium">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="xl:w-[302px] md:w-1/2">
          <h5 className="text-white text-lg font-semibold capitalize pb-2 relative before:absolute before:bg-blue-600 before:w-[9px] before:h-[3px] before:rounded-md before:start-0 before:bottom-0  after:absolute after:bg-blue-600 after:w-[116px] after:h-[3px] after:rounded-md after:start-4 after:bottom-0">
            Photos and videos
          </h5>
          <ul className="grid grid-cols-3 mt-6">
            {images.map((image) => (
              <li>
                <img
                  src={image}
                  alt="image"
                  width={101}
                  height={105}
                  className="max-w-full object-cover w-full"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-white text-sm font-normal font-['Lato'] mt-10">
        Copyright © 2024{" "}
        <span className="text-blue-600 font-medium font-['Righteous']">
          Imax Store
        </span>{" "}
        . All rights reserved.
      </p>
    </div>
  );
};
