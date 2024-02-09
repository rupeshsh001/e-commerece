"use client";

import { Box, Paper, Skeleton, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { ProductType } from "~/Types/ProductTypes";
import { useClickOutside } from "~/hooks/useClickOutside";
import useDebounce from "~/hooks/useDebounce";

const SearchProduct = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: async () => {
      const response = await axios("https://fakestoreapi.com/products");
      return response.data;
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 1) {
      setShowSearchResult(true);
    }
    setSearchInput(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowSearchResult(false);
    }
  };

  useClickOutside(inputRef, handleClickOutside);

  if (!data || isLoading) {
    return <Skeleton variant="rectangular" width={700} height={50} />;
  }

  const filteredProducts = data.filter((product: ProductType) =>
    product.title.toLowerCase().includes(debouncedSearchInput.toLowerCase())
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }} ref={inputRef}>
      <TextField
        size="small"
        value={searchInput}
        onChange={handleInputChange}
        fullWidth
        placeholder="Search..."
        type="search"
        sx={{ bgcolor: "rgb(240,245,255)" }}
      />
      {showSearchResult ? (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            boxShadow: "1px 1px 2px grey",
            zIndex: 100,
            p: 1,
            maxHeight: { xs: "300px", sm: "500px" },
            overflowY: "auto",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: ProductType, index: number) => (
              <Typography
                key={product.id}
                gutterBottom
                onClick={() => {
                  router.push(`/product/${product.id}`);
                  setShowSearchResult(false);
                }}
                sx={{
                  borderBottom: index !== filteredProducts.length - 1 ? "1px solid rgb(240,245,255)" : "none",
                  "&:hover": { bgcolor: "rgb(240,245,255)", cursor: "pointer" },
                }}
              >
                <Box component={"strong"}>{product.title}</Box>
              </Typography>
            ))
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                "&:hover": { bgcolor: "rgb(240,245,255)", cursor: "pointer" },
              }}
            >
              <Box component={"strong"}>Products Not Found</Box>
            </Typography>
          )}
        </Paper>
      ) : null}
    </Box>
  );
};

export default SearchProduct;
