"use client";

import { useRef, useState } from "react";
import { Box } from "@mui/material";

interface Offset {
  left: number;
  top: number;
}

export default function ProductMagnifier({ imageUrl }: { imageUrl: string }) {
  const sourceRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [opacity, setOpacity] = useState<number>(0);
  const [offset, setOffset] = useState<Offset>({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sourceRef.current || !targetRef.current || !containerRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio = (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(Math.min(e.pageX - sourceRect.left, sourceRect.width), 0);
    const top = Math.max(Math.min(e.pageY - sourceRect.top, sourceRect.height), 0);

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio,
    });
  };

  return (
    <Box sx={{ width: 500, height: 500, position: "relative" }}>
      <Box
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        sx={{
          position: "relative",
          overflow: "hidden",
          display: "block",
          padding: "50px",
          border: "1px solid #00adb7",
          borderRadius: "15px",
          "&:hover": {
            boxShadow: "0 14px 24px rgba(0, 0, 0, 0.55), 0 14px 18px rgba(0, 0, 0, 0.55)",
          },
        }}
      >
        <Box component="img" ref={sourceRef} alt="source" src={imageUrl} />
      </Box>
      <Box
        component="img"
        ref={targetRef}
        alt="target"
        sx={{
          position: "absolute",
          left: offset.left + "px",
          top: offset.top + "px",
          opacity: opacity,
          transform: "scale(2)",
          cursor: "zoom-in",
        }}
        src={imageUrl}
      />
    </Box>
  );
}
