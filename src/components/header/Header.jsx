import { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDebounce } from "../../hooks";
import { useProducts } from "../../contexts";

export function Header() {
  const [search, setSearch] = useState("");

  const debounced = useDebounce(search, 200);
  const { handleSearch } = useProducts();

  useEffect(() => {
    handleSearch(debounced);
  }, [debounced]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Liza Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
          <Col xs="auto">
            <Form.Control
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
