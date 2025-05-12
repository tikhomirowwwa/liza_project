import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useProducts } from "../../contexts";
import "./AdminPage.scss";

export const AdminPage = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const { addProduct } = useProducts();

  const onChange = ({ target }) => {
    setProduct({ ...product, [target.name]: target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addProduct({ ...product, price: parseFloat(product.price) });
    setProduct({
      title: "",
      description: "",
      price: "",
      image: "",
    });
    await addProduct(product);
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Create New Product</h1>
      <Form className="admin-page__form" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            value={product.title}
            onChange={onChange}
            name="title"
            type="text"
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            onChange={onChange}
            value={product.description}
            type="text"
            name="description"
            placeholder="Enter description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            value={product.price}
            onChange={onChange}
            name="price"
            type="number"
            placeholder="Enter price"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            required
            value={product.image}
            onChange={onChange}
            name="image"
            type="url"
            placeholder="Enter image URL"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
