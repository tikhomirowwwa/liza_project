import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

import React from "react";

const ProductContextProvider = ({ children }) => {
  const getData = async (searchText = "") => {
    try {
      const { data } = await axios(
        `https://liza-project-seven.vercel.app/api/data?q=${searchText}`
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  const [data, setData] = useState([]);

  const fetchData = async (searchText) => {
    const res = await getData(searchText);
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addProduct = async (newProduct) => {
    await axios.post("http://localhost:3000/data", newProduct);
    fetchData();
  };

  const handleSearch = (searchText) => {
    fetchData(searchText);
  };

  const value = {
    data,
    addProduct,
    handleSearch,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
