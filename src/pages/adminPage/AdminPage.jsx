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

  const onSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...product, price: parseFloat(product.price) });
    setProduct({
      title: "",
      description: "",
      price: "",
      image: "",
    });
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Создать новый товар</h1>
      <Form className="admin-page__form" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Название</Form.Label>
          <Form.Control
            required
            value={product.title}
            onChange={onChange}
            name="title"
            type="text"
            placeholder="Введите название"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Информация</Form.Label>
          <Form.Control
            required
            onChange={onChange}
            value={product.description}
            type="text"
            name="description"
            placeholder="Введите информацию"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Цена</Form.Label>
          <Form.Control
            required
            value={product.price}
            onChange={onChange}
            name="price"
            type="number"
            placeholder="Введите цену"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Фото</Form.Label>
          <Form.Control
            required
            value={product.image}
            onChange={onChange}
            name="image"
            type="url"
            placeholder="Вставьте URL картинки"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Подтвердить
        </Button>
      </Form>
    </div>
  );
};
