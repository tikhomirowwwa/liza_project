import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

import React from "react";
import { useNavigate } from "react-router-dom";

const ProductContextProvider = ({ children }) => {
  const getData = async (searchText = "") => {
    try {
      const { data } = await axios(
        `https://liza-project-seven.vercel.app/api/data`
      );
      if (searchText) {
        console.log(data, data.data);

        return data.data.filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  const [data, setData] = useState([]);

  const fetchData = async (searchText) => {
    const { data } = await getData(searchText);

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProduct = async (newProduct) => {
    await axios.post(
      "https://liza-project-seven.vercel.app/api/data",
      newProduct
    );
    fetchData();
  };

  const handleSearch = (searchText) => {
    // setData(data.filter((item) => item.title.includes(searchText)));
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
