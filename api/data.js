export default function handler(req, res) {
  res.status(200).json([
    {
      title: "Product 1",
      image: "/images/product1.jpg",
      description: "Description for product 1",
      price: 19.99,
    },
    {
      title: "Product 2",
      image: "/images/product2.jpg",
      description: "Description for product 2",
      price: 29.99,
    },
  ]);
}
