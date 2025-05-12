import React, { useEffect } from "react";
import { ProductCard } from "../../components";
import { useProducts } from "../../contexts";

export const HomePage = () => {
  const { products } = useProducts();

  return (
    <div className="d-flex gap-3 m-5 flex-wrap justify-content-center">
      {products?.map((cardData) => (
        <ProductCard key={cardData.id} cardData={cardData} />
      ))}
    </div>
  );
};
