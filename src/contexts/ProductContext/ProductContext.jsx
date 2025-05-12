import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

import React from "react";

const ProductContextProvider = ({ children }) => {
  const initialProducts = [
    {
      id: "1",
      title: "Wireless Headphones",
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=SmFOSTFzWmdkMW1XWjFUWXBDRzdBd2tuVHYzMERCZURia3c5SzJFOTlPZ3oveDdpQVpwS0ltY2w2UW05aU90T0huV2F0aExud1Z0YndiMUgwNXJZQnc",
      description:
        "Noise-cancelling over-ear headphones with 30 hours battery life.",
      price: 99.99,
    },
    {
      id: "2",
      title: "Smartwatch",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDG1jENzFIE_Lyq7jx3j5Mq1qYq9sfL16yg&s",
      description:
        "Water-resistant smartwatch with fitness tracking and notifications.",
      price: 149.99,
    },
    {
      id: "3",
      title: "Gaming Mouse",
      image:
        "https://m.media-amazon.com/images/I/71vm32j2InL._AC_UF1000,1000_QL80_.jpg",
      description: "Ergonomic design with customizable RGB lighting.",
      price: 59.99,
    },
    {
      id: "4",
      title: "Bluetooth Speaker",
      image:
        "https://media.wired.com/photos/67d9c30ede323b7691481569/4:3/w_320%2Cc_limit/JBL-Flip-7-Bluetooth-Speaker-teal-(front-in-garden)-Reviewer-Photo-SOURCE-Ryan-Waniata.jpg",
      description: "Portable speaker with deep bass and 10-hour playtime.",
      price: 39.99,
    },
    {
      id: "5",
      title: "4K Monitor",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6PhzL3jNZp_62adV-FUAU2_dCowFxP0vwg&s",
      description: "Ultra HD monitor with vibrant colors and ultra-thin bezel.",
      price: 299.99,
    },
  ];

  const getProductsFromLS = () => {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : initialProducts;
  };

  const [products, setProducts] = useState(getProductsFromLS);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    axios(`https://liza-project-seven.vercel.app/api/data`);
  }, [products]);

  const addProduct = async (product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    await axios.post("https://liza-project-seven.vercel.app/api/data", product);
  };

  // const getData = async (searchText = "") => {
  //   try {
  //     const { data } = await axios(
  //       `https://liza-project-seven.vercel.app/api/data`
  //     );
  //     if (searchText) {
  //       return data.data.filter((item) =>
  //         item.title.toLowerCase().includes(searchText.toLowerCase())
  //       );
  //     }
  //     return data;
  //   } catch (error) {
  //     console.error("Failed to fetch data:", error);
  //     return [];
  //   }
  // };

  // const [data, setData] = useState([]);

  // const fetchData = async (searchText) => {
  //   // const { data } = await getData(searchText);
  //   // setData(data);
  // };

  // const addProduct = async (newProduct) => {
  //   setData([...data, { ...newProduct, id: Math.random() }]);
  //
  //   // fetchData();
  // };

  // const handleSearch = (searchText) => {
  //   // setData(data.filter((item) => item.title.includes(searchText)));
  //   fetchData(searchText);
  // };

  const value = {
    products,
    addProduct,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
