import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import SearchProduct from "../SearchProduct";
import CompanyName from "./CompanyName";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Headers = () => {
  return (
    <Box
      component={"header"}
      sx={{
        display: "flex",
        p: 2,
        boxShadow: "2px 0 10px gray",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "normal", sm: "space-between" },
      }}
    >
      <Box sx={{ mr: 1 }}>
        <CompanyName />
      </Box>
      <Box sx={{ width: { xs: "100%", sm: 800 } }}>
        <SearchProduct />
      </Box>
      <Box sx={{ display: "flex" }}>
        <IconButton aria-label="Favorites">
          <FavoriteIcon />
          <Typography variant="body2">Favorites</Typography>
        </IconButton>
        <IconButton aria-label="Login">
          <AccountCircleIcon sx={{ ml: 5 }} />
          <Typography variant="body2">Login</Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Headers;
