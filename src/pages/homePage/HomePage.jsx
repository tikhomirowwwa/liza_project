import React from "react";
import { ProductCard } from "../../components";
import { useProducts } from "../../contexts";

export const HomePage = () => {
  const { products, searchTerm } = useProducts();

  const filtered = searchTerm
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
      )
    : products;

  return (
    <div className="d-flex gap-3 m-5 flex-wrap justify-content-center">
      {filtered?.map((cardData) => (
        <ProductCard key={cardData.id} cardData={cardData} />
      ))}
    </div>
  );
};
