"use client";

import React from "react";
import { useTheme } from "@/Components/theme-provider";

const ThemedImage = ({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => {
    const { theme } = useTheme();
    let src;

  switch (theme) {
    case "light":
      src = lightSrc;
      break;
    case "dark":
      src = darkSrc;
      break;
    default:
      src = lightSrc;
      break;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ThemedImage;
