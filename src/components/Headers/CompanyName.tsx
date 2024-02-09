import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";

const CompanyName = () => {
  return (
    <Box sx={{ color: "blue", fontSize: { xs: "18px", sm: "22px" }, textWrap: "nowrap", cursor: "pointer" }}>
      <Link href={"/"}>Rupesh&apos;s Store</Link>
    </Box>
  );
};

export default CompanyName;
