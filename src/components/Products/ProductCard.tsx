import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { ProductType } from "~/Types/ProductTypes";

export default function ProductCard({ product }: { product: ProductType }) {
  const router = useRouter();

  return (
    <Card
      sx={{
        transition: "all 0.2s",
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          boxShadow: "1px 1px 10px gray",
        },
      }}
    >
      <CardHeader title={product.title} subheader={product.category} />
      <CardMedia
        component="img"
        height="194"
        image={product.image}
        alt={`${product.title} image`}
        sx={{
          objectFit: "contain",
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button variant="outlined" onClick={() => router.push(`/product/${product.id}`)}>
          View More
        </Button>
      </CardActions>
    </Card>
  );
}
