import React from "react";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import ProductDetail from "~/components/Products/ProductDetail";

type PageProps = {
  params: {
    productId: string;
  };
};

const Product = ({ params }: PageProps) => {
  const { productId } = params;
  return (
    <MaxWidthWrapper>
      <ProductDetail id={productId} />
    </MaxWidthWrapper>
  );
};

export default Product;
