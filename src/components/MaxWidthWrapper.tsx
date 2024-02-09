import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ mx: { xs: 1, sm: 5 }, my: 1 }}>{children}</Box>;
};

export default MaxWidthWrapper;
