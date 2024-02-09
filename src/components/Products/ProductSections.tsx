"use client";
import { Box, Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "~/Types/ProductTypes";
import MaxWidthWrapper from "../MaxWidthWrapper";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";

const ProductSections = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: async () => {
      const response = await axios("https://fakestoreapi.com/products");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <Grid container spacing={2} mt={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Skeleton variant="rectangular" width={350} height={400} />
            </Grid>
          ))}
        </Grid>
      </MaxWidthWrapper>
    );
  }

  return (
    <>
      <ProductCarousel />
      <MaxWidthWrapper>
        <Box sx={{ my: 2 }}>
          <Grid container spacing={2}>
            {data.map((product: ProductType) => (
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </MaxWidthWrapper>
    </>
  );
};

export default ProductSections;
