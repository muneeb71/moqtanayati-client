"use client";

import Image from "next/image";
import { useState } from "react";

const SafeImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  style = {},
  fallbackSrc = "/static/logo.png",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc && fallbackSrc !== src) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else {
      // If fallback also fails, hide the image
      setImgSrc("");
    }
  };

  if (!imgSrc) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className}`}
        style={{ width, height, ...style }}
      >
        <span className="text-sm text-gray-400">Image</span>
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={handleError}
      {...props}
    />
  );
};

export default SafeImage;
