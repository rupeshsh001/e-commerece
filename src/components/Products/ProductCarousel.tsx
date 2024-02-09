import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const images = ["/cara1.jpg", "/cara2.jpg", "/cara3.png"];

const ProductCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      sx={{ position: "relative", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ width: "100%", height: "350px", position: "relative" }}>
        <Image src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} layout="fill" />
        {hovered && (
          <>
            <IconButton
              sx={{ position: "absolute", top: "50%", left: "0", transform: "translateY(-50%)" }}
              onClick={handlePrev}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              sx={{ position: "absolute", top: "50%", right: "0", transform: "translateY(-50%)" }}
              onClick={handleNext}
            >
              <NavigateNextIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductCarousel;
