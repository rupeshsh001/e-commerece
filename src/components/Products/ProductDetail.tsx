"use client";

import { Star } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Grid, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notFound } from "next/navigation";
import { useState } from "react";

const testImages = [
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
];

const ProductDetail = ({ id }: { id: string }) => {
  const [currImage, setCurrImage] = useState("");
  const { isLoading, data, error } = useQuery({
    queryKey: ["fetchProductsDetails", id],
    queryFn: async () => {
      const response = await axios(`https://fakestoreapi.com/products/${id}`);
      setCurrImage(response.data.image);
      return response.data;
    },
  });
  if (isLoading) {
    return (
      <Card sx={{ boxShadow: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rectangular" width="100%" height={500} animation="wave" />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Skeleton variant="text" animation="wave" width="60%" />
              <Skeleton variant="text" animation="wave" width="40%" />
              <Skeleton variant="text" animation="wave" width="80%" />
              <Skeleton variant="text" animation="wave" width="70%" />
              <Skeleton variant="text" animation="wave" width="90%" />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    );
  }

  if (error || !data) {
    return notFound();
  }

  // const handleHover = (image: string) => {
  //   setCurrImage(image);
  // };

  return (
    <Card sx={{ boxShadow: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CardMedia
            component="img"
            height="500"
            image={currImage}
            alt={data.title}
            sx={{
              p: 3,
              objectFit: "contain",
              transition: "all .3s",
              cursor: "pointer",
              "&:hover": {
                p: 0,
              },
            }}
          />
          <Grid container spacing={4} p={1}>
            {testImages.map((image, i) => {
              return (
                <Grid item sm={3} key={i}>
                  <CardMedia
                    component="img"
                    height="100"
                    width="100"
                    image={image}
                    alt={data.title}
                    sx={{
                      p: 1,
                      objectFit: "contain",
                      border: image === currImage ? "1px solid blue" : "none",
                      cursor: "pointer",
                      transition: "all .3s",
                      "&:hover": {
                        p: 0,
                      },
                    }}
                    onClick={() => setCurrImage(image)}
                    // onMouseEnter={() => handleHover(image)}
                    // onMouseLeave={() => handleHover(image)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {data.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Category: {data.category}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Price: ${data.price}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Description: {data.description}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="textSecondary" sx={{ marginRight: 1 }}>
                Rating:
              </Typography>
              <Box display="flex" alignItems="center">
                {[...Array(Math.round(data.rating.rate))].map((_, index) => (
                  <Star key={index} color="primary" />
                ))}
                <Typography variant="body2" color="textSecondary">
                  ({data.rating.count} reviews)
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button color="primary" variant="contained">
                <Star sx={{ mr: 1 }} />
                Add to Favorites
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductDetail;
