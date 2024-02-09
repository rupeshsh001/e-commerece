import { Box, Typography, Container } from "@mui/material";
import React from "react";

export default function NotFound() {
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Box
        sx={{
          bgcolor: "#f8f9fa",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          p: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Product Not Found
        </Typography>
        <Typography variant="body1">We&apos;re sorry, the product you are looking for could not be found.</Typography>
      </Box>
    </Container>
  );
}
